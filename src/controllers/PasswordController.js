import bcrypt from "bcryptjs";
import User from "../models/User"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const mailwala = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user:,
        pass:
    }
})





