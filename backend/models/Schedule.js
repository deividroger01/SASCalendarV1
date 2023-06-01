const mongoose = require("mongoose");

const { Schema } = mongoose;

const scheduleSchema = new Schema({
    availableDays: {
        type: String,
        required: true
    },
    availableHours: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = {
    Schedule,
    scheduleSchema,
}