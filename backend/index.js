

import express from 'express';
import { port } from './config.js';
import mongoose from 'mongoose';
import recordRoute from './routes/recordRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();




const app = express();


app.use(express.json());

app.use(cors());
//second opt
//app.use(
  //  cors({
    //    origin: '',
      //  methods: [],
      //  allowedHeaders: [],
   // }

//  ));




  app.get('/', (req,res ) =>{
    console.log(req);
    return res.status(234).send('welcome to mern');
  });

  app.use('/record',recordRoute);

  

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, ()=>{
        console.log('app listen on port: ${port}');
    
    });
})
    .catch((error) => {
        console.log(error);
    });


    

    




