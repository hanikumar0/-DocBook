const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

// Book appointment (patient)
router.post("/book", auth, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
      time,
    });

    await appointment.save();
    res.json({ msg: "Appointment booked", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get my appointments (patient)
router.get("/my", auth, async (req, res) => {
  try {
    const appts = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId");
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get appointments for a doctor (doctor side)
router.get("/doctor", auth, async (req, res) => {
  try {
    const { doctorId } = req.query;
    const appts = await Appointment.find({ doctorId })
      .populate("patientId");
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
