import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 
export default async function connectDB(){
  try {
    // console.log(process.env.MongoURI)
    const conn = await mongoose.connect(process.env.UserMongoURI);
    console.log(`MongoDB Connected: ${await conn.connection.host}`);
  }
  catch(error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
