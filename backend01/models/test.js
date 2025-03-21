const mongoose = require("mongoose");
const Appointment = require("./models/AppointmentModel");

// Connect to MongoDB (Change the URL if needed)
mongoose.connect("mongodb://127.0.0.1:27017/appointmentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");

    // Create a test appointment
    const testAppointment = new Appointment({
        ownerName: "John Doe",
        petName: "Buddy",
        contactNumber: "1234567890",
        appointmentDate: new Date("2024-03-20"),
        appointmentTime: "10:30 AM",
        serviceType: "Vaccination",
        status: "Pending"
    });

    return testAppointment.save();
}).then(() => {
    console.log("Appointment saved successfully");
    mongoose.connection.close();
}).catch((err) => {
    console.log("Error:", err.message);
    mongoose.connection.close();
});
