const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    ownerName: { type: String, required: true, trim: true },
    petType: { type: String, required: true, trim: true },
    
    
    contactNumber: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"] 
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { 
        type: String, 
        required: true, 
        match: [/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Please enter time in HH:mm AM/PM format"] 
    },
    serviceType: { type: String, required: true, trim: true },
    status: { 
        type: String, 
        enum: ["Pending", "Completed", "Cancelled"], 
        default: "Pending" 
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
