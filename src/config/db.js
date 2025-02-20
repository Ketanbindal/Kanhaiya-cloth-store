import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
export default async function connectDB(){
  try {
    const conn = await mongoose.connect(process.env.MongoURI);
    console.log(`MongoDB Connected: ${await conn.connection.host}`);
  }
  catch(error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
