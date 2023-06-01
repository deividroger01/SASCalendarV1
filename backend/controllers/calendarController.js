const { google } = require("googleapis");
const { create } = require("./serviceController");
const { OAuth2 } = google.auth;
require("dotenv").config({ path: __dirname + "/.env" });

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const calendarController = {
  create: async (req, res) => {
    try {
      const event = {
        summary:
          "Novo agendamento com: " +
          req.body.clientName +
          "! Para fazer: " +
          req.body.serviceInfo +
          ". Prepare-se!",
        description:
          req.body.clientName +
          " agendou " +
          req.body.serviceInfo +
          ". Este é o telefone: " +
          req.body.clientPhone +
          " e este é o e-mail: " +
          req.body.clientEmail +
          ".",
        start: {
          dateTime: req.body.startTime,
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: req.body.endTime,
          timeZone: "America/Sao_Paulo",
        },
        attendees: [{ email: req.body.clientEmail }],
        colorId: 2,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(req.body.clientEmail)) {
        res.status(400).json({
          screen: "Agendar Serviço",
          msg: "E-mail  do cliente inválido",
        });
        return;
      }

      const phoneRegex = /^\d{11}$/;

      if (!phoneRegex.test(req.body.clientPhone)) {
        res.status(400).json({
          screen: "Agendar Serviço",
          msg: "Número de telefone do cliente inválido",
        });
        return;
      }

      calendar.events.insert(
        {
          calendarId: "primary",
          resource: event,
        },
        (err, response) => {
          if (err) {
            console.error("Erro ao criar evento:", err);
            res.status(500).json({
              screen: "Agendar Serviço",
              msg: "Erro ao criar evento",
            });
            return;
          }
          console.log("Evento criado com sucesso:", response.data);
          res.status(201).json({
            response: response.data.id,
            screen: "Agendar Serviço",
            msg: "Agendamento criado com sucesso!",
          });
        }
      );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ screen: "Agendar Serviço", msg: "Erro ao criar evento" });
    }
  },

  freebusy: async (req, res) => {
    try {
      const reqBusy = {
        timeMin: req.body.timeMin,
        timeMax: req.body.timeMax,
        timeZone: "America/Sao_Paulo",
        items: [
          {
            id: "primary",
          },
        ],
      };

      calendar.freebusy.query(
        {
          requestBody: reqBusy,
        },
        (err, response) => {
          if (err) {
            console.error("Erro ao consultar freebusy:", err);
            res.status(500).json({
              msg: "Erro ao consultar freebusy",
            });
            return;
          }
          console.log("Freebusy consultado com sucesso:", response.data);
          res.status(201).json({
            response: response.data.calendars.primary.busy,
            msg: "Freebusy consultado com sucesso!",
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao consultar freebusy" });
    }
  },

  update: async (req, res) => {
    try {
      const reqUpdate = {
        summary:
          "Novo agendamento com: " +
          req.body.clientName +
          "! Para fazer: " +
          req.body.serviceInfo +
          ". Prepare-se!",
        description:
          req.body.clientName +
          " agendou " +
          req.body.serviceInfo +
          ". Este é o telefone: " +
          req.body.clientPhone +
          " e este é o e-mail: " +
          req.body.clientEmail +
          ".",
        start: {
          dateTime: req.body.startTime,
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: req.body.endTime,
          timeZone: "America/Sao_Paulo",
        },
        attendees: [{ email: req.body.clientEmail }],
        colorId: 2,
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(req.body.clientEmail)) {
        res.status(400).json({
          screen: "Agendar Serviço",
          msg: "E-mail  do cliente inválido",
        });
        return;
      }

      const phoneRegex = /^\d{11}$/;

      if (!phoneRegex.test(req.body.clientPhone)) {
        res.status(400).json({
          screen: "Agendar Serviço",
          msg: "Número de telefone do cliente inválido",
        });
        return;
      }

      calendar.events.update(
        {
          calendarId: "primary",
          eventId: req.body.eventId,
          sendUpdates: "all",
          requestBody: reqUpdate,
        },
        (err, response) => {
          if (err) {
            console.error("Erro ao atualizar evento:", err);
            res.status(500).json({
              msg: "Erro ao atualizar evento",
            });
            return;
          }
          console.log("Evento atualizado com sucesso:", response.data);
          res.status(201).json({
            response: response.data.id,
            msg: "Evento atualizado com sucesso!",
          });
        }
      );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ msg: "Erro" + res.status + "ao atualizar evento" });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      calendar.events.delete(
        {
          calendarId: "primary",
          eventId: id,
          sendUpdates: "all",
        },
        (err, response) => {
          if (err) {
            console.error("Erro ao cancelar evento:", err);
            res.status(500).json({
              msg: "Erro ao cancelar evento",
            });
            return;
          }
          console.log("Evento cancelado com sucesso:", response.data);
          res.status(201).json({
            response: response.data.id,
            msg: "Evento cancelado com sucesso!",
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao cancelar evento" });
    }
  },
};

module.exports = calendarController;
