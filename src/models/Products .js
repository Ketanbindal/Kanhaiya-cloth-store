import mongoose from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
export const Product = mongoose.model("Product", productSchema);
