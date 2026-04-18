import { Schema, model, models, Types } from 'mongoose';

export interface TaskDocument {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  assigneeEmail?: string;
  createdBy?: Types.ObjectId;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    dueDate: { type: String, required: true },
    assigneeEmail: { type: String, trim: true, lowercase: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  },
  { timestamps: true }
);

export const Task = models.Task || model<TaskDocument>('Task', taskSchema);
