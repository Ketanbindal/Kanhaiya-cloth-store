import express from 'express';
const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => res.send('Get all categories'));




categoryRouter.get('/:id', (req, res) => res.send('Get category by ID'));





categoryRouter.post('/', (req, res) => res.send('Create category'));




categoryRouter.put('/:id', (req, res) => res.send('Update category'));




categoryRouter.delete('/:id', (req, res) => res.send('Delete category'));

export default categoryRouter;