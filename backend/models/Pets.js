import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    species: { type: String, enum: ['Dog', 'Cat', 'Bird', 'Other'], required: true },
    breed: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    dateOfBirth: { type: Date, required: true },
    colorMarks: { type: String },
    microchipNumber: { type: String, sparse: true }, // Optional unique identifier
    medicalHistory: [
        {
            visitDate: Date,
            diagnosis: String,
            treatment: String,
            vetName: String
        }
    ]
});

const UserPetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pets: [PetSchema] // Each user can register multiple pets
});

const UserPet = mongoose.model('UserPet', UserPetSchema);

export default UserPet;