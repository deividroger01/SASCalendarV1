const { OAuth2Client } = require("google-auth-library");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ServiceProvider: ServiceProviderModel,
  serviceProviderSchema,
} = require("../models/ServiceProvider");

const serviceProviderController = {
  create: async (req, res) => {
    try {
      const serviceProvider = {
        spname: req.body.spname,
        fantasyname: req.body.fantasyname,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        description: req.body.description,
        doc: req.body.doc,
      };

      if (!serviceProvider.spname) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
      }

      if (!serviceProvider.fantasyname) {
        return res.status(422).json({ msg: "O nome fantasia é obrigatório!" });
      }

      if (!serviceProvider.email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
      }

      if (!serviceProvider.password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
      }

      if (!serviceProvider.doc) {
        return res.status(422).json({ msg: "O CPF/CNPJ é obrigatório!" });
      }

      if (serviceProvider.password !== serviceProvider.confirmpassword) {
        return res.status(422).json({ msg: "As senhas não conferem!" });
      }

      //checar se o Prestador de Serviços já existe
      const serviceProviderExists = await ServiceProviderModel.findOne({
        email: serviceProvider.email,
      });

      if (serviceProviderExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro email!" });
      }

      //criar senha mais segura no banco
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(serviceProvider.password, salt);
      serviceProvider.password = passwordHash;

      //criar o Prestador de Serviços

      const response = await ServiceProviderModel.create(serviceProvider);

      res
        .status(201)
        .json({ response, msg: "Prestador de Serviço criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Ocorreu um erro no servidor!" });
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const serviceProvider = {
        email: req.body.email,
        password: req.body.password,
      };

      if (!serviceProvider.email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
      }

      if (!serviceProvider.password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
      }

      //checar se o Prestador de Serviços já existe
      const serviceProviderExists = await ServiceProviderModel.findOne({
        email: serviceProvider.email,
      });

      if (!serviceProviderExists) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }

      //checar se a senha bate
      const checkPassword = await bcrypt.compare(
        serviceProvider.password,
        serviceProviderExists.password
      );

      if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida!" });
      }

      //logar o Prestador de Serviços e gerar token

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: serviceProvider._id,
        },
        secret
      );

      res
        .status(200)
        .json({ token, msg: "Autenticação realizada com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: "Ocorreu um erro no servidor!" });
      console.log(error);
    }
  },

  /*getAll: async (req, res) => {
        try {

            const serviceProvider = await ServiceProviderModel.find();

            res
                .status(200)
                .json({ serviceProvider });

        } catch (error) {
            res
                .status(500)
                .json({ msg: "Ocorreu um erro no servidor!" })
            console.log(error);
        }
    },*/

  get: async (req, res) => {
    try {
      const id = req.params.id;

      // Checar se o Prestador de Serviço existe no banco
      const serviceProvider = await ServiceProviderModel.findById(
        id,
        "-password"
      );

      if (!serviceProvider) {
        return res
          .status(404)
          .json({ msg: "Prestador de Serviço não encontrado." });
      }

      res.status(200).json({ serviceProvider });
    } catch (error) {
      res.status(500).json({ msg: "Ocorreu um erro no servidor!" });
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const serviceProvider = await ServiceProviderModel.findById(id);

      if (!serviceProvider) {
        return res
          .status(404)
          .json({ msg: "Prestador de Serviço não encontrado." });
      }

      const deletedServiceProvider =
        await ServiceProviderModel.findByIdAndDelete(id);

      res.status(200).json({
        deletedServiceProvider,
        msg: "Prestador de Serviço excluído com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ msg: "Ocorreu um erro no servidor!" });
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const serviceProvider = {
        spname: req.body.spname,
        fantasyname: req.body.fantasyname,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        doc: req.body.doc,
      };

      const updatedServiceProvider =
        await ServiceProviderModel.findByIdAndUpdate(id, serviceProvider);

      if (!updatedServiceProvider) {
        return res
          .status(404)
          .json({ msg: "Prestador de Serviço não encontrado." });
      }

      res.status(200).json({
        serviceProvider,
        msg: "Prestador de Serviço atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ msg: "Ocorreu um erro no servidor!" });
      console.log(error);
    }
  },

  googleAuth: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email_verified, email, spname } = verify.payload;
      if (!email_verified) res.json({ message: "Email não foi verificado!" });
      const servProvExist = await ServiceProviderModel.findOne({
        email,
      }).select("-password");
      if (servProvExist) {
        res.cookie("servProvToken", tokenId, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ token: tokenId, servProv: servProvExist });
      } else {
        const password = email + process.env.GOOGLE_CLIENT_ID;
        const newservProv = await ServiceProviderModel({
          spname: name,
          password,
          email,
        });
        await newservProv.save();
        res.cookie("servProvToken", tokenId, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          message: "Usuário cadastrado com sucesso!",
          token: tokenId,
        });
      }
    } catch (error) {
      res.status(500);
      console.log("Houve um erro no servidor:" + error);
    }
  },
};

module.exports = serviceProviderController;
