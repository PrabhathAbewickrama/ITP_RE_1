const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create a new appointment
router.post("/add", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding appointment", error });
  }
});

module.exports = router;
