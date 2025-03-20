const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  ownerName: String,
  contactNumber: String,
  petName: String,
  appointmentDate: String,
  appointmentTime: String,
  serviceType: String,
  userId: String, // User ID to track appointment ownership
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
