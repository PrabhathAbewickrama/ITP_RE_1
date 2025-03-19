/*
import express from 'express';
import { port, mongoDBurl} from './config.js';  
import mongoose from 'mongoose';


const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Hello Mern!');
});


mongoose.connect(mongoDBurl)

  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    
  })
  .catch((error) => {
    console.log('Error');
  });
*/


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });


const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);

