// backend/models/Doctor.js
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic details
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    feesPerConsultation: { type: Number, default: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    // Availability
    availableDays: { type: [String], default: [] },
    availableTime: { type: String },

    // Verification fields
    registrationNumber: { type: String, required: true },
    clinicName: { type: String },
    degree: { type: String },

    isVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date, default: null },

    certificateUrl: { type: String },
    idProofUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
