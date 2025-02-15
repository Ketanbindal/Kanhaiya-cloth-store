import mongoose from "mongoose";

export const connectDB = async () => {
  try {



    const conn = mongoose.connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch{
    console.error(`Error: ${error.message}`);
    process.exit(1);

  }
}