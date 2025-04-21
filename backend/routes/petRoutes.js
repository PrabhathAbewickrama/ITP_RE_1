import express from 'express';
import mongoose from 'mongoose';  // Import mongoose
import UserPet from '../models/Pets.js';

const router = express.Router();

// Create a new pet for a user
router.post('/create', async (req, res) => {
    try {
        const { userId, petName, species, breed, gender, dateOfBirth, colorMarks, microchipNumber } = req.body;

        // Validate required fields
        if (!userId || !petName || !species || !gender || !dateOfBirth) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Validate if userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        // Check if user already has pets
        let userPets = await UserPet.findOne({ userId });

        if (!userPets) {
            // If user doesn't have any pets, create a new document
            userPets = new UserPet({ userId, pets: [] });
        }

        // Add new pet to the pets array
        const newPet = {
            petName,
            species,
            breed,
            gender,
            dateOfBirth,
            colorMarks,
            microchipNumber
        };

        userPets.pets.push(newPet);
        await userPets.save();

        res.status(201).json({ message: "Pet added successfully", pet: newPet });

    } catch (error) {
        console.error("Error creating pet:", error);
        
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid data format", error: error.message });
        }

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// Get all pets (admin route)
router.get('/all', async (req, res) => {
    try {
        const allPets = await UserPet.find().populate('userId', 'name email');
        res.status(200).json(allPets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific pet by ID
router.get('/pet/:petId', async (req, res) => {
    try {
        const userPets = await UserPet.findOne({ "pets._id": req.params.petId });
        if (!userPets) {
            return res.status(404).json({ message: "Pet not found" });
        }

        const pet = userPets.pets.find(pet => pet._id.toString() === req.params.petId);
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all pets for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const userPets = await UserPet.findOne({ userId: req.params.userId });
        if (!userPets) {
            return res.status(404).json({ message: "No pets found for this user" });
        }
        res.status(200).json(userPets.pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update pet information
router.put('/update/:petId', async (req, res) => {
    try {
        const updates = req.body;
        const userPets = await UserPet.findOneAndUpdate(
            { "pets._id": req.params.petId },
            { $set: { "pets.$": { ...updates, _id: req.params.petId } } },
            { new: true }
        );

        if (!userPets) {
            return res.status(404).json({ message: "Pet not found" });
        }

        const updatedPet = userPets.pets.find(pet => pet._id.toString() === req.params.petId);
        res.status(200).json({ message: "Pet updated successfully", pet: updatedPet });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a pet
router.delete('/delete/:petId', async (req, res) => {
    try {
        const userPets = await UserPet.findOneAndUpdate(
            { "pets._id": req.params.petId },
            { $pull: { pets: { _id: req.params.petId } } },
            { new: true }
        );

        if (!userPets) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add medical history to a pet
router.post('/medical/:petId', async (req, res) => {
    try {
        const { visitDate, diagnosis, treatment, vetName } = req.body;
        
        const userPets = await UserPet.findOneAndUpdate(
            { "pets._id": req.params.petId },
            { 
                $push: { 
                    "pets.$.medicalHistory": {
                        visitDate,
                        diagnosis,
                        treatment,
                        vetName
                    }
                }
            },
            { new: true }
        );

        if (!userPets) {
            return res.status(404).json({ message: "Pet not found" });
        }

        const updatedPet = userPets.pets.find(pet => pet._id.toString() === req.params.petId);
        res.status(200).json({ 
            message: "Medical history added successfully", 
            medicalHistory: updatedPet.medicalHistory 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get medical history for a pet
router.get('/medical/:petId', async (req, res) => {
    try {
        const userPets = await UserPet.findOne({ "pets._id": req.params.petId });
        if (!userPets) {
            return res.status(404).json({ message: "Pet not found" });
        }

        const pet = userPets.pets.find(pet => pet._id.toString() === req.params.petId);
        res.status(200).json(pet.medicalHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;