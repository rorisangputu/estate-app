import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

//db connection
const connect = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.MONGO_CON);
        console.log('Connected to Database')
    } catch (error) {
        console.log(error);
    }
}
    

const app = express();
app.listen(3000, () => {
    connect();
    console.log('Running on PORT 3000')
    
})