import { Schema, model, models } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
});

export const User = models.User || model<UserDocument>('User', userSchema);
