const mongoose = require("mongoose");

const { Schema } = mongoose;

const gAuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GAuth = mongoose.model("GAuth", gAuthSchema);

module.exports = {
  GAuth,
  gAuthSchema,
};
