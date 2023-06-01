const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceProviderSchema = new Schema({
    spname: {
        type: String,
        required: true
    },
    fantasyname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    doc: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

module.exports = {
    ServiceProvider,
    serviceProviderSchema,
}