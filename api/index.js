import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import listingRoutes from './routes/listing.route.js'
import cookieParser from 'cookie-parser';

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
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/listing', listingRoutes)

app.listen(3000, () => {
    connect();
    console.log('Running on PORT 3000')
    
})

//Middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})