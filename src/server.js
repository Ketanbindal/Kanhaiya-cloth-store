import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";
import cors from "cors";



dotenv.config(); // Load environment variables from .env

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
try{app.use(cors());}
catch(e)
{
  console.log(e)
}


app.use(cookieParser());

app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000;

// Ensure MongoDB connects before starting the server
connectDB()
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1); // Exit if DB connection fails
  });
