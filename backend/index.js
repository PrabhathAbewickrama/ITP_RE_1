

import express from 'express';
import { port } from './config.js';
import mongoose from 'mongoose';
import recordRoute from './routes/recordRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,
};
app.use(cors(corsOptions));


  app.use('/record',recordRoute);
//s
  app.use('/user', userRoutes);
app.use('/api/pets', petRoutes);
//s

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, ()=>{
        console.log(`app listen on port: ${port}`);
    
    });
})
    .catch((error) => {
        console.log(error);
    });


    

    




