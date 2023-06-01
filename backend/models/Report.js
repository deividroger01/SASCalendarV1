const mongoose = require("mongoose");

const { Schema } = mongoose;

const { schedulingSchema } = require("./Scheduling");

const reportSchema = new Schema({
    scheduling: {
        type: [schedulingSchema]
    }
}, {
    timestamps: true
});

const Report = mongoose.model("Report", reportSchema);

module.exports = {
    Report
}