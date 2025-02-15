import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import Routes
import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import categoryRouter from './routes/category.js';
import orderRouter from './routes/order.js';
import cartRouter from './routes/cart.js';
import paymentRouter from './routes/payment.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Database Connection


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/admins', adminRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter);
app.use('/api/payments', paymentRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
