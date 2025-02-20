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
exports.Login = async (req, res)=>
{
    let error = validationResult(req)
    if (!error.isEmpty)
        {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            
            const { username, Password} = req.body;
            const user = await User.findOne({username: username});   
            const canacess = bcrypt.compare(Password, user.Password);
            if(!canacess){       
                return res.status(400).json({
                    message : "Wrong password or Username"

                })  }
            const token = jwt.sign({username : user.username, role : user.role, })
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Secure cookies in production
                maxAge: 3600000, // 1 hour
            });
            res.json({ message: "Login successful", token })
        }
        catch(e)
        {
            res.status(500).json({error:error.message})
        }
};