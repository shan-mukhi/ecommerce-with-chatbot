import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
dotenv.config({
    path:'./.env'
})

const app= express();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`.bgMagenta.white);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

//routes
app.use('/api/v1/auth',authRoutes);