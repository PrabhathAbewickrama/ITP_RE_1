

import express, { response } from 'express';
import { Record } from '../models/RecordModel.js';

const router = express.Router();

// save a new record

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.ID ||
            !req.body.VetName ||
            !req.body.Treatment ||
            !req.body.date
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }



        const newRecord = {
            ID: req.body.ID,
            VetName: req.body.VetName,
            Treatment: req.body.Treatment,
            date: req.body.date,
        };

        const record = await Record.create(newRecord);
        return res.status(201).send(record);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }


});


// Route for getting all record
router.get('/', async (req, res) => {
    try {
        const record = await Record.find();
        return res.status(200).json({
            count: record.length,
            data: record,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route for getting a record by ID
router.get('/:ID', async (req, res) => {
    try {

        const { ID } = req.params;
        const record = await Record.findById(ID);
        return res.status(200).json(record);


    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route for updating a record 
router.put('/:ID', async (req, res) => {
    try {
        if (
            !req.body.ID ||
            !req.body.VetName ||
            !req.body.Treatment ||
            !req.body.date
        ) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const { ID } = req.params;

        const record = await Record.findByIdAndUpdate(ID, req.body);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        return res.status(200).json(record);
    }


    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

    // Route for deleting a record
    router.delete('/:ID', async (req, res) => {
        try {
            const { ID } = req.params;
            const record = await Record.findByIdAndDelete(ID);

            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }
            return res.status(200).json({ message: 'Record deleted successfully' });

        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    });
}
);

export default router;

