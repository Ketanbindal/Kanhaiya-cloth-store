import mongoose from 'mongoose'

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', OrderSchema);