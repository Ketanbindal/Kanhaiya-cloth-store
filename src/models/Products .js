import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type:String, required:true},
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { timestamps: true }
);
export const Product = mongoose.model("Product", productSchema);
