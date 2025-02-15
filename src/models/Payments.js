import mongoose from "mongoose"



const PaymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderId: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export const Payment = model('Payment', PaymentSchema);
