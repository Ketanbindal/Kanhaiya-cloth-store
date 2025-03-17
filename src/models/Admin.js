// models/admin.model.js
import mongoose from "mongoose"




const AdminSchema = new Schema({
    adminName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    permissions: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export const Admin = model('Admin', AdminSchema);