import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRoute from "./routers/movie.route.js";
import kidRoute from "./routers/kid.route.js";
import webRoute from "./routers/web.route.js";  
import cors from 'cors';
import userRoute from "./routers/user.route.js";

const app = express();  
dotenv.config();
const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


const connect = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}
connect();

app.use("/moviewatch", movieRoute);
app.use("/kidwatch", kidRoute);
app.use("/webwatch", webRoute);
app.use("/user",userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})