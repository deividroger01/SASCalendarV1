const { now } = require("mongoose");
const { Scheduling } = require("../models/Scheduling");
const { Service: ServiceModel, serviceSchema } = require("../models/Service");

const serviceController = {
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price,
        status: req.body.status,
      };

      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const service = await ServiceModel.find();

      res.json(service);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        res.status(404).json({ msg: "Serviço não encontrado." });
        return;
      }

      res.json(service);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        res
          .status(404)
          .json({ screen: "Excluir Serviço", msg: "Serviço não encontrado." });
        return;
      }

      if (service.status == true) {
        res.status(401).json({
          screen: "Excluir Serviço",
          msg: "Serviço não pode ser deletado, pois está ativo!",
        });
        return;
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id);

      res.status(200).json({
        deletedService,
        screen: "Excluir Serviço",
        msg: "Serviço excluído com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      const upService = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        price: req.body.price,
        status: req.body.status,
      };

      if (upService.duration === undefined) {
        /*if (
          service.status == true &&
          Scheduling.service.id == service.id &&
          Scheduling.endHour > now()
        ) {
          res.status(401).json({
            screen: "Editar Serviço",
            msg: "Não é possível alterar desativar esse serviço pois existem agendamentos pendentes!",
          });
          return;
        }*/

        const updatedService = await ServiceModel.findByIdAndUpdate(
          id,
          upService
        );

        if (!updatedService) {
          res
            .status(404)
            .json({ screen: "Editar Serviço", msg: "Serviço não encontrado." });
          return;
        }

        res.status(200).json({
          service,
          screen: "Editar Serviço",
          msg: "Serviço atualizado com sucesso!",
        });
      } else if (service.duration !== upService.duration) {
        console.log(
          "service: ",
          service.duration,
          "upService: ",
          upService.duration
        );
        res.status(401).json({
          screen: "Editar Serviço",
          msg: "Não é possível alterar a duração deste serviço, por favor crie um novo serviço com a duração desejada!",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = serviceController;
