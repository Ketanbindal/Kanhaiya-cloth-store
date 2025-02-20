import Express from "express"
import { ExpressValidator } from "express-validator"
import {Signup, Login} from "c:/Users/KetanBindal/Desktop/saperate form/Kanhaiya-cloth-store/src/controllers/Authcontroller.js"
const router = Express.Router();
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
        return isvalidpassword(value)
    }).withMessage("Password must be at least 6 characters long")
]

validateLogin = [

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
router.post("/register", SignupValidation, Signup);
router.post("/login", checkAuthCookie, validateLogin, Login);



export default router;