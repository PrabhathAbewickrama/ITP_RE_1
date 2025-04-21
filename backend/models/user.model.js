/*

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

*/

import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      default: "Pet Owner", // Default role for regular registration
    },
    gender: {
      type: String,
      trim: true,
    },
    specialization: {
      type: String,
      required: function() {
        return this.role === "Veterinarian"; // Only required for veterinarians
      },
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      required: function() {
        return this.role === "Veterinarian"; // Only required for veterinarians
      },
      min: 0,
    },
    isVerified: {
      type: Boolean,
      default: false, // Veterinarians need verification before accessing medical records
    },
    petProfiles: [
      {
        petName: String,
        petType: String,
        petAge: Number,
        medicalHistory: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserModelSchema);
export default User;