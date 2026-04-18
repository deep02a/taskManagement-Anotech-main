import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/user';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  await connectToDatabase();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ message: 'Server misconfiguration: JWT_SECRET missing' }, { status: 500 });
  }

  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: '7d' });

  return NextResponse.json({ token, user: { name: user.name, email: user.email } });
}
