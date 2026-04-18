import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/anotech-task-manager';
export const JWT_SECRET = process.env.JWT_SECRET || 'change-me-to-a-secret';
export const PORT = Number(process.env.PORT || 4000);
