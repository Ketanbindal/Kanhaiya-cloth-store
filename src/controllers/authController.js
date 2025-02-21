import User from '../models/User.js';
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



//Export and the functionality of the Signup


export async function Signup(req, res)
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
        const token = jwt.sign({username : user.username, role : user.role, })
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                maxAge: 3600000, 
            });
        res.status(201).json({message : 'User Registered Sucessfully'});
    }catch(e){
        res.status(500).json({error:error.message})
    }
};
export async function Login  (req, res)
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
                    message : "Username does not exists"

                })  }
            const token = jwt.sign({username : user.username, role : user.role, })
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                maxAge: 3600000, 
            });
            res.json({ message: "Login successful", token })
        }
        catch(e)
        {
            res.status(500).json({error:error.message})
        }
};