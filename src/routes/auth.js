import express from "express"
import { body, validationResult } from "express-validator";
import { Signup, Login } from "../controllers/AuthController.js";
const router = express.Router();
import User from "../models/User.js";


async function alreadyexists(value, item)
{
    const user = await User.findOne({[item] : username});
    if (user)
    {
        return res.status(400).json({ message: "Username already exists" });
    }
    return true  
}

function isvalidpassword(value)
{
    const havelowercase = /[A-Z]/.test(value);
    const haveUppercase = /[a-z]/.test(value);
    const notHaveSpace = /[^\s]/.test(value);
    const haveSymbol = /[^a-zA-Z0-9]/.test(value);
    const haveNumber = /[^0-9]/.test(value);
    if(havelowercase &&haveUppercase && notHaveSpace && haveSymbol && haveNumber)
    {
        return true;
    }
    else
    {
        throw new Error("Password must include uppercase, lowercase, number, and special character");
    }
    
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
    body("password").isLength({ min: 8 }).custom((value, {req})=>
    {
        return isvalidpassword(value)
    }).withMessage("Password must be at least 6 characters long")
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