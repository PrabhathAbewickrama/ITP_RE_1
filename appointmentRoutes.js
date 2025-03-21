const express = require("express");
const router = express.Router();
const Appointment = require("./AppointmentModel");

// Create a new appointment
router.post("/add", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: "Appointment added successfully", appointment });
    } catch (error) {
        res.status(500).json({ error: "Error adding appointment" });
    }
});

// Get all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching appointments" });
    }
});

// Get a single appointment by ID
router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: "Error fetching appointment" });
    }
});

// Update an appointment
router.put("/update/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json({ message: "Appointment updated successfully", appointment });
    } catch (error) {
        res.status(500).json({ error: "Error updating appointment" });
    }
});

// Delete an appointment
router.delete("/delete/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting appointment" });
    }
});

module.exports = router;
