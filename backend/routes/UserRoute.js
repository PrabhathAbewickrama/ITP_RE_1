/*

import express from 'express';
import { test } from '../controllers/user.controller.js'

const router = express.Router();

router.get('/', test);


export default router;
*/
import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password, // Storing password as plain text (not recommended for production)
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (simple comparison, not secure for production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put("/profile/:id", async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    // Since no session or token is used, just send a success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
});

// Unified update route that handles both regular users and veterinarians
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is changed and already exists
    if (updateData.email && updateData.email !== user.email) {
      const existingEmail = await User.findOne({ email: updateData.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Check if phone is changed and already exists
    if (updateData.phone && updateData.phone !== user.phone) {
      const existingPhone = await User.findOne({ phone: updateData.phone });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
    }
    
    // Handle password update
    if (updateData.password) {
      // In a real app, you would hash the password here
      user.password = updateData.password;
      // Remove from updateData to avoid double-updating
      delete updateData.password;
    }
    
    // Handle role changes
    const oldRole = user.role;
    const newRole = updateData.role;
    
    // If changing to Veterinarian role, ensure required fields are present
    if (newRole === "Veterinarian" && oldRole !== "Veterinarian") {
      if (!updateData.specialization) {
        return res.status(400).json({ message: "Specialization is required for Veterinarian role" });
      }
      
      // Set default values for vet-specific fields if not provided
      if (updateData.yearsOfExperience === undefined) {
        updateData.yearsOfExperience = 0;
      }
      
      // Set verification status to false for new Veterinarians
      updateData.isVerified = false;
    }
    
    // If changing from Veterinarian to another role, remove vet-specific fields
    if (oldRole === "Veterinarian" && newRole !== "Veterinarian") {
      user.specialization = undefined;
      user.yearsOfExperience = undefined;
      user.isVerified = undefined;
    }
    
    // Update all fields from the request
    Object.keys(updateData).forEach(key => {
      user[key] = updateData[key];
    });
    
    // Save the updated user
    await user.save();
    
    // Create a response without the password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      gender: user.gender
    };
    
    // Add veterinarian-specific fields to response if user is a vet
    if (user.role === "Veterinarian") {
      userResponse.specialization = user.specialization;
      userResponse.yearsOfExperience = user.yearsOfExperience;
      userResponse.isVerified = user.isVerified;
    }
    
    res.status(200).json({
      message: "User updated successfully",
      user: userResponse
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change Password Route
router.put("/change-password/:id", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update the password
    user.password = newPassword; // In production, hash the password before saving
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to register veterinarians
router.post("/register-vet", async (req, res) => {
  try {
    // Get form data
    const { name, email, phone, password, gender, specialization, yearsOfExperience } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !gender || !specialization) {
      return res.status(400).json({ message: "All fields are required for veterinarian registration" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Check for duplicate phone number
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "User with this phone number already exists" });
    }

    // Create new veterinarian
    const vet = new User({
      name,
      email,
      phone,
      password,
      role: "Veterinarian",
      gender,
      specialization,
      yearsOfExperience: yearsOfExperience || 0,
      isVerified: false, // Veterinarians start unverified by default
    });

    await vet.save();
    res.status(201).json({ 
      message: "Veterinarian registered successfully", 
      user: {
        id: vet._id,
        name: vet.name,
        email: vet.email,
        role: vet.role
      }
    });
  } catch (error) {
    console.error("Error registering veterinarian:", error);
    res.status(500).json({ message: error.message });
  }
});

// Route to update veterinarian profile
router.put("/update-vet/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { 
      name, 
      email, 
      phone, 
      gender, 
      specialization, 
      yearsOfExperience, 
      password 
    } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify it's a veterinarian
    if (user.role !== "Veterinarian") {
      return res.status(400).json({ message: "This endpoint is only for updating veterinarian profiles" });
    }

    // Check if email is changed and already exists
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Check if phone is changed and already exists
    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (specialization) user.specialization = specialization;
    if (yearsOfExperience !== undefined) user.yearsOfExperience = yearsOfExperience;
    
    // Update password if provided
    if (password) {
      // In a real application, you should hash the password here
      // For example: user.password = await bcrypt.hash(password, 10);
      user.password = password;
    }

    // Save updated user
    await user.save();

    // Return updated user (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      gender: user.gender,
      specialization: user.specialization,
      yearsOfExperience: user.yearsOfExperience,
      isVerified: user.isVerified
    };

    res.status(200).json({ 
      message: "Veterinarian profile updated successfully", 
      user: userResponse 
    });

  } catch (error) {
    console.error("Error updating veterinarian:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;