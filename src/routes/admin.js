import express from 'express';
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => res.send('Get all admins'));



adminRouter.get('/:id', (req, res) => res.send('Get admin by ID'));




adminRouter.post('/', (req, res) => res.send('Create admin'));




adminRouter.put('/:id', (req, res) => res.send('Update admin'));




adminRouter.delete('/:id', (req, res) => res.send('Delete admin'));

export default adminRouter;