const { Report: ReportModel, reportSchema } = require("../models/Report");

const reportController = {

    create: async (req, res) => {
        try {

            const report = {
                scheduling: req.body.scheduling
            };

            const response = await ReportModel.create(report);

            res
                .status(201)
                .json({ response, msg: "Relatório criado com sucesso!" });


        } catch (error) {
            console.log(error);
        }
    },

    getAll: async (req, res) => {
        try {

            const report = await ReportModel.find();

            res.json(report);

        } catch (error) {
            console.log(error);
        }
    },

    get: async (req, res) => {
        try {

            const id = req.params.id

            const report = await ReportModel.findById(id);

            if (!report) {
                res
                    .status(404)
                    .json({ msg: "Relatório não encontrado." });
                return;
            }

            res.json(report);

        } catch (error) {
            console.log(error);
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const report = await ReportModel.findById(id);

            if (!report) {
                res
                    .status(404)
                    .json({ msg: "Relatório não encontrado." });
                return;
            }

            const deletedReport = await ReportModel.findByIdAndDelete(id);

            res
                .status(200)
                .json({ deletedReport, msg: "Relatório excluído com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        try {

            const id = req.params.id

            const report = {
                scheduling: req.body.scheduling
            };

            const updatedReport = await ReportModel.findByIdAndUpdate(id, report);

            if (!updatedReport) {
                res
                    .status(404)
                    .json({ msg: "Relatório não encontrado." });
                return;
            }

            res
                .status(200)
                .json({ report, msg: "Relatório atualizado com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },


};

module.exports = reportController;