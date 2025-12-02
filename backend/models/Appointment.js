// backend/models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: { type: String, required: true }, // format yyyy-mm-dd
    time: { type: String, required: true }, // format hh:mm

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },

    note: { type: String }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
