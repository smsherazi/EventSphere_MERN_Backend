import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const ConnectionURI = `mongodb+srv://${username}:${password}@firstcluster.pcbyl3g.mongodb.net/College_Event_Management?retryWrites=true&w=majority&appName=FirstCluster`;

const DbConnect = async () =>{
    await mongoose.connect(ConnectionURI);
    console.log("DB Connected!");
}


export default DbConnect;

