const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  name: String,
  userId: String, // User who owns the pet
});

module.exports = mongoose.model("Pet", PetSchema);
