import express from "express"
import { body, validationResult } from "express-validator";
import { Signup, Login } from "../controllers/AuthController.js";
const router = express.Router();
import User from "../models/User.js";


async function alreadyexists(value, item)
{
    const user = await User.findOne({[item] : value });
    if (user)
    {
        return res.status(400).json({ message: "Username already exists" });
    }
    return true  
}

function isvalidpassword(value)
{
    const hasLowercase = /[a-z]/.test(value); 
    const hasUppercase = /[A-Z]/.test(value);  
    const noSpaces = /^\S+$/.test(value);    
    const hasSymbol = /[^a-zA-Z0-9]/.test(value); 
    const hasNumber = /\d/.test(value);  
    if(hasLowercase && hasUppercase && noSpaces && hasSymbol && hasNumber)
    {
        return true;
    }
    
    throw new Error("Password must include uppercase, lowercase, number, and special character");

    
}
const SignupValidation = [
    body("username").notEmpty().withMessage("Please enter username").custom((value, {req})=>
        {   
            return alreadyexists(value, 'username')
        }).withMessage("This username already exists"),
    body("email").isEmail().custom((value, {req})=>
    {   
        return alreadyexists(value, 'email')
    }).withMessage("Invalid email format"),
    body("Password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").custom((value, {req})=>
    {
        return isvalidpassword(value)
    })
]


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
const validateLogin = [

    body("username").notEmpty().custom((value, {req})=>
        {   
            createduser = alreadyexists(value, 'username')
            if (!createduser){
                throw new Error("This username doesnot exists")
            }
        }),
    body("password").notEmpty().withMessage("Please Enter your password")
]


const checkAuthCookie = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) return next(); // No token, proceed to normal login

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return res.json({ message: "Logged in via cookie", user: decoded });
    } catch (error) {
        return next(); // Invalid token, proceed to normal login
    }
};
router.post("/register", SignupValidation,handleValidationErrors, Signup);
router.post("/login", checkAuthCookie, validateLogin,handleValidationErrors, Login)
export default router;