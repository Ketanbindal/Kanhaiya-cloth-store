import User from "../models/User";
import { ExpressValidator } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";



//Export and the functionality of the Signup


exports.Signup = async (req, res)=>
{
    let error = validationResult(req)
    if (!error.isEmpty)
    {
        return res.status(400).json({ errors: errors.array() });
    }
}