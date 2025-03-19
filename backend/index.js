

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {Record } from './models/RecordModel.js';
import recordRoute from './routes/recordRoute.js';
import cors from 'cors';

//middlewere handling polycy
//option1 allow all origin with deflt of cors
app.use(cors());

//option2 allow only custom origin
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });


const app = express();

//middleware
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
)

app.use('/record', recordRoute);

//
// app.use("/backend/user", userRoutes);



app.post('/record', async (req, res) => {
    try {
        if(
            !req.body.ID ||
            !req.body.VetName ||
            !req.body.Treatment ||
            !req.body.date
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
    }
        catch(error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
  

const newRecord = {
    ID: req.body.ID,
    VetName: req.body.VetName,
    Treatment: req.body.Treatment,
    date: req.body.date,    
};

const record = await Record.create(newRecord);
return res.status(201).send(record);



});  


// Route for getting all record
app.get('/record', async (req, res) => {
    try {
        const record = await Record.find();
        return res.status(200).json({
            count: record.length,
            data: record,
        });
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}   ); 


// Route for getting a record by ID
app.get('/record/:ID', async (req, res) => {
    try {

        const { ID } = req.params;
        const record = await Record.findById(ID);
        return res.status(200).json(record);


        }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}   ); 

// Route for updating a record 
app.put('/record/:ID', async (req, res) => {
    try {
        if(
            !req.body.ID ||
            !req.body.VetName ||
            !req.body.Treatment ||
            !req.body.date
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }   
    
    const { ID } = req.params;

    const record = await Record.findByIdAndUpdate(ID, req.body);

    if(!record) {
        return res.status(404).json({ message: 'Record not found' });
    }
    return res.status(200).json(record);
    }


    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

    // Route for deleting a record
app.delete('/record/:ID', async (req, res) => {
    try {
        const { ID } = req.params;
        const record = await Record.findByIdAndDelete(ID);

        if(!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        return res.status(200).json({ message: 'Record deleted successfully' });
    
}
catch(error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
}});
}
  );