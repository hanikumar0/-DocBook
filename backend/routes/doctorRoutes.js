// routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Doctor = require("../models/Doctor");


// 🔹 Create or update doctor profile (for logged-in doctor)
router.post("/profile", auth, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Only doctors can create profile" });
    }

    const {
      specialization,
      experience,
      feesPerConsultation,
      phone,
      address,
      availableDays,
      availableTime,
      registrationNumber,
      clinicName,
      degree,
    } = req.body;

    if (!specialization || !phone || !address || !registrationNumber) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    let doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      // create new
      doctor = new Doctor({
        userId: req.user.id,
        specialization,
        experience,
        feesPerConsultation,
        phone,
        address,
        availableDays,
        availableTime,
        registrationNumber,
        clinicName,
        degree,
        isVerified: false, // always false until admin verifies
      });
    } else {
      // update existing profile (keeps isVerified unchanged)
      doctor.specialization = specialization;
      doctor.experience = experience;
      doctor.feesPerConsultation = feesPerConsultation;
      doctor.phone = phone;
      doctor.address = address;
      doctor.availableDays = availableDays;
      doctor.availableTime = availableTime;
      doctor.registrationNumber = registrationNumber;
      doctor.clinicName = clinicName;
      doctor.degree = degree;
    }

    await doctor.save();
    res.json({ msg: "Profile saved (pending verification)", doctor });
  } catch (err) {
    console.error("Error saving doctor profile:", err.message);
    res.status(500).send("Server error");
  }
});

// 🔹 Get all VERIFIED doctors (for patients)
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({ isVerified: true }).populate(
      "userId",
      "name email"
    );
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).send("Server error");
  }
});

// 🔹 Get my doctor profile (for logged-in doctor)
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Only doctors can view this" });
    }

    const doctor = await Doctor.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email"
    );

    if (!doctor) {
      return res.status(404).json({ msg: "Doctor profile not found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("Error fetching doctor profile:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
