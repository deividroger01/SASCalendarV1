const { Schedule: ScheduleModel, scheduleSchema } = require("../models/Schedule");

const scheduleController = {

    // Será necessário pegar os dias e horários disponíveis na API Google Calendar e criar aqui.
    create: async (req, res) => {
        try {

            const schedule = {
                availableDays: req.body.availableDays,
                availableHours: req.body.availableHours,
            };

            const response = await ScheduleModel.create(schedule);

            res
                .status(201)
                .json({ response, msg: "Agenda criada com sucesso!" });


        } catch (error) {
            console.log(error);
        }
    },

    //Será necessário pegar da API Google Calendar via método freebusy
    getAll: async (req, res) => {
        try {

            const schedule = await ScheduleModel.find();

            res.json(schedule);

        } catch (error) {
            console.log(error);
        }
    },

    //Será necessário pegar da API Google Calendar via método freebusy (verificar se é possível pegar por data/hora específica)
    get: async (req, res) => {
        try {

            const id = req.params.id

            const schedule = await ScheduleModel.findById(id);

            if (!schedule) {
                res
                    .status(404)
                    .json({ msg: "Agenda não encontrada." });
                return;
            }

            res.json(schedule);

        } catch (error) {
            console.log(error);
        }
    },

    // Será necessário entender melhor esse método (é possível excluir data/hora disponíveis? Faz sentido?)
    delete: async (req, res) => {
        try {

            const id = req.params.id

            const schedule = await ScheduleModel.findById(id);

            if (!schedule) {
                res
                    .status(404)
                    .json({ msg: "Agenda não encontrada." });
                return;
            }

            const deletedSchedule = await ScheduleModel.findByIdAndDelete(id);

            res
                .status(200)
                .json({ deletedSchedule, msg: "Agenda excluída com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },

    // Será necessário entender como atualizar as datas e horários disponíveis (método freebusy?) 
    update: async (req, res) => {
        try {

            const id = req.params.id

            const schedule = {
                availableDays: req.body.availableDays,
                availableHours: req.body.availableHours,
            };

            const updatedschedule = await ScheduleModel.findByIdAndUpdate(id, schedule);

            if (!updatedschedule) {
                res
                    .status(404)
                    .json({ msg: "Agenda não encontrada." });
                return;
            }

            res
                .status(200)
                .json({ schedule, msg: "Agenda atualizada com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },


};

module.exports = scheduleController;