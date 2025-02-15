import express from 'express';
const orderRouter = express.Router();

// Order Routes
orderRouter.get('/', (req, res) => res.send('Get all orders'));




orderRouter.get('/:id', (req, res) => res.send('Get order by ID'));




orderRouter.post('/', (req, res) => res.send('Create order'));




orderRouter.put('/:id', (req, res) => res.send('Update order'));




orderRouter.delete('/:id', (req, res) => res.send('Delete order'));




export default orderRouter;