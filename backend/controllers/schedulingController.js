const {
  Scheduling: SchedulingModel,
  schedulingSchema,
} = require("../models/Scheduling");

const schedulingController = {
  create: async (req, res) => {
    try {
      const scheduling = {
        eventId: req.body.eventId,
        serviceId: req.body.serviceId,
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        clientEmail: req.body.clientEmail,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      };

      const response = await SchedulingModel.create(scheduling);

      res
        .status(201)
        .json({ response, msg: "Agendamento criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const scheduling = await SchedulingModel.find();

      res.json(scheduling);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const scheduling = await SchedulingModel.findById(id);

      if (!scheduling) {
        res.status(404).json({ msg: "Agendamento não encontrado." });
        return;
      }

      res.json(scheduling);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const scheduling = await SchedulingModel.findById(id);

      if (!scheduling) {
        res.status(404).json({ msg: "Agendamento não encontrado." });
        return;
      }

      const deletedScheduling = await SchedulingModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedScheduling, msg: "Agendamento excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const scheduling = {
        eventId: req.body.eventId,
        serviceId: req.body.serviceId,
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        clientEmail: req.body.clientEmail,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      };

      const updatedScheduling = await SchedulingModel.findByIdAndUpdate(
        id,
        scheduling
      );

      if (!updatedScheduling) {
        res
          .status(404)
          .json({
            screen: "Atualizar Agendamento",
            msg: "Agendamento não encontrado.",
          });
        return;
      }

      res
        .status(200)
        .json({
          scheduling,
          screen: "Atualizar Agendamento",
          msg: "Agendamento atualizado com sucesso!",
        });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = schedulingController;
