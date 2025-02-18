import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username : {type:String, required:true, unique:true},
        email : {type: String, required:true, unique:true},
        role : {type:String, enum: ['Admi', 'customer'], default: 'customer'},
        Password : {type:String, required:true, unique:true},
        createdAT : {type:Date, default:Date.now} 
    }
)

const User = mongoose.model('User', UserSchema);
export default User;