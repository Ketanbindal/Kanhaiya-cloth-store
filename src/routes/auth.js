import Express from "express"
import { ExpressValidator } from "express-validator"
import {Signup, Login} from '../controllers/authController'
const router = express.Router();
import User from "../models/User";


async function alreadyexists(value, item)
{
    const user = await User.findOne({item : username});
    if (user)
    {
        throw new Error(`{item} already exists`);
    }
    return true  
}

function isvalidpassword(value)
{
    havelowercase = /[A-Z]/.test(value);
    haveUppercase = /[a-z]/.test(value);
    notHaveSpace = /[^\s]/.test(value);
    haveSymbol = /[^a-zA-Z0-9]/.test(value);
    haveNumber = /[^0-9]/.test(value);
    if(havelowercase &&haveUppercase && notHaveSpace && haveSymbol && haveNumber)
    {
        return true;
    }
    else
    {
        throw new Error("Password is too weak")
    }
}
SignupValidation = [
    body("username").notEmpty().custom((value, {req})=>
        {   
            return alreadyexists(value, 'username')
        }).withMessage("Name is required"),
    body("email").isEmail().custom((value, {req})=>
    {   
        return alreadyexists(value, 'email')
    }).withMessage("Invalid email format"),
    body("password").isLength({ min: 8 }).custom((value, {req})=>
    {

    }).withMessage("Password must be at least 6 characters long")
]