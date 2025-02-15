import express from 'express';
const cartRouter = express.Router();

// Cart Routes
cartRouter.get('/', (req, res) => res.send('Get all carts'));



cartRouter.get('/:id', (req, res) => res.send('Get cart by ID'));



cartRouter.post('/', (req, res) => res.send('Create cart'));



cartRouter.put('/:id', (req, res) => res.send('Update cart'));



cartRouter.delete('/:id', (req, res) => res.send('Delete cart'));

export default cartRouter;