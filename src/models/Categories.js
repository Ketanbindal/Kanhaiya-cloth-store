import mongoose form "mongoose"


const CategorySchema = new Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});
