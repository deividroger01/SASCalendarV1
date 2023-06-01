const { get } = require("mongoose");
const jwt = require("jsonwebtoken");
const { Client: ClientModel, clientSchema } = require("../models/Client");

const clientController = {
  create: async (req, res) => {
    try {
      const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        doc: req.body.doc,
      };

      const response = await ClientModel.create(client);

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: client._id,
        },
        secret
      );

      res
        .status(201)
        .json({ response, token, msg: "Cliente criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const client = await ClientModel.find();

      res.json(client);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const client = await ClientModel.findById(id);

      if (!client) {
        res.status(404).json({ msg: "Cliente não encontrado." });
        return;
      }

      res.json(client);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const client = await ClientModel.findById(id);

      if (!client) {
        res.status(404).json({ msg: "Cliente não encontrado." });
        return;
      }

      const deletedClient = await ClientModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedClient, msg: "Cliente excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        doc: req.body.doc,
      };

      const updatedClient = await ClientModel.findByIdAndUpdate(id, client);

      if (!updatedClient) {
        res.status(404).json({ msg: "Cliente não encontrado." });
        return;
      }

      res.status(200).json({ client, msg: "Cliente atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = clientController;
