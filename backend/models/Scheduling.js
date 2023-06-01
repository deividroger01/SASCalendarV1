const mongoose = require("mongoose");

const { Schema } = mongoose;

const { Service, serviceSchema } = require("./Service");

const schedulingSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientPhone: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scheduling = mongoose.model("Scheduling", schedulingSchema);

module.exports = {
  Scheduling,
  schedulingSchema,
};
