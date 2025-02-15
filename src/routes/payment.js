import express from 'express';
const paymentRouter = express.Router();

// Payment Routes
paymentRouter.get('/', (req, res) => res.send('Get all payments'));




paymentRouter.get('/:id', (req, res) => res.send('Get payment by ID'));



paymentRouter.post('/', (req, res) => res.send('Create payment'));



paymentRouter.put('/:id', (req, res) => res.send('Update payment'));



paymentRouter.delete('/:id', (req, res) => res.send('Delete payment'));

export default paymentRouter;