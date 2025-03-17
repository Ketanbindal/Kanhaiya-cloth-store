import Admin from '../models/Admin.js';
import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



//Export and the functionality of the Signup


export async function Signup(req, res)
{
    let error = validationResult(req)
    if (!error.isEmpty)
    {
        return res.status(400).json({ errors: error.array() });
    }
    try{
        const { username, email, Password} = req.body;
        const hashpass = await bcrypt.hash(Password, 10);
        const Admin = new Admin({username, email, Password : hashpass});
        await Admin.save();
        const token = jwt.sign({username : Admin.username, role : Admin.role,},  process.env.JWT_SECRET,{ expiresIn: '1h' } )
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                maxAge: 1200000, 
            });
        res.status(201).json({message : 'Admin Registered Sucessfully'});
    }catch(e){
        console.error("Registration Error:", e);
        res.status(500).json({ error: e.message });
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
            const Admin = await Admin.findOne({username: username});   
            const canacess = bcrypt.compare(Password, Admin.Password);
            if(!canacess){       
                return res.status(400).json({
                    message : "Admin does not exists"

                })  }
            const token = jwt.sign({username : Admin.username, role : Admin.role, },process.env.JWT_SECRET,{ expiresIn: '1h' })
            res.cookie("auth_token", token, {
                httpOnly: true,      
                secure: false,       
                sameSite: "Lax",
            });
            res.json({ message: "Login successful", token })
        }
        catch(e)
        {
            console.error("Registration Error:", e);
            res.status(500).json({error:error.message})
        }
};