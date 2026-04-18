import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import { MONGODB_URI, PORT } from './config';

const app = express();

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/],
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
