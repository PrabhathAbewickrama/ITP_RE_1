import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema( { 
    ID: {
        type: String,
        required: true,
    },
    VetName: {
        type: String,
        required: true,
    },
    Treatment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
 });

export const Record = mongoose.model('Record', RecordSchema);