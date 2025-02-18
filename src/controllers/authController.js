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
    try{
        const { username, email, Password} = req.body;
        const hashpass = await bcrypt.hash(Password, 10);
        const user = new User({username, email, Password : hashpass});
        await user.save();
        res.status(201).json({message : 'User Registered Sucessfully'});
    }catch(e){
        res.status(500).json({error:error.message})
    }
};
