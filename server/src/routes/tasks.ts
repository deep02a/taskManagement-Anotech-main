import { Router } from 'express';
import { Task } from '../models/Task';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// router.use(authenticateToken);

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  return res.json({ tasks });
});

router.post('/', async (req, res) => {
  const { title, description, status, dueDate, assigneeEmail } = req.body;

  if (!title || !description || !dueDate || !status) {
    return res.status(400).json({ message: 'Title, description, status, and due date are required' });
  }

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    dueDate,
    assigneeEmail: assigneeEmail?.trim() || undefined,
  });
  return res.status(201).json({ task });
});

router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id },
    updates,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.json({ task });
});

router.delete('/:id', async (req: AuthRequest, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.json({ message: 'Task deleted' });
});

export default router;
