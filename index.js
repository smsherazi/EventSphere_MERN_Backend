import express from 'express';
const app  = express();
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import  DbConnect  from './Config/connection.js';
dotenv.config();

import userRouter from './Routes/user.route.js';
import eventRouter from './Routes/event.route.js';
import feedbackRouter from './Routes/feedback.route.js';
import certificateRouter from './Routes/certificate.route.js';
import attendanceRouter from './Routes/attendance.route.js';
import mediaGalleryRouter from './Routes/mediaGallery.route.js';
import registrationRouter from './Routes/registration.route.js';

app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5174","http://localhost:5173"],
        credentials: true
    }
))

const PORT = process.env.PORT;


app.use(cookieParser()); 

DbConnect();

app.use(userRouter);
app.use(eventRouter);
app.use(feedbackRouter);
app.use(certificateRouter);
app.use(attendanceRouter);
app.use(mediaGalleryRouter);
app.use(registrationRouter);

app.listen(PORT, ()=>{
    console.log(`Server Running on PORT - ${PORT}`)
})
