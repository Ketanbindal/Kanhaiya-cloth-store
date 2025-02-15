// routes/product.js
import express from 'express';
const productRouter = express.Router();

productRouter.get('/', (req, res) => res.send('Get all products'));



productRouter.get('/:id', (req, res) => res.send('Get product by ID'));





productRouter.post('/', (req, res) => res.send('Create product'));






productRouter.put('/:id', (req, res) => res.send('Update product'));





productRouter.delete('/:id', (req, res) => res.send('Delete product'));



export default productRouter;