import mongoose from 'mongoose'




const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }],
    createdAt: { type: Date, default: Date.now }
});

export const Cart = model('Cart', CartSchema);