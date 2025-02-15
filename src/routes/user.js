import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => res.send('Get all users'));





userRouter.get('/:id', (req, res) => res.send('Get user by ID'));




userRouter.post('/', (req, res) => res.send('Create user'));




userRouter.put('/:id', (req, res) => res.send('Update user'));




userRouter.delete('/:id', (req, res) => res.send('Delete user'));

export default userRouter;