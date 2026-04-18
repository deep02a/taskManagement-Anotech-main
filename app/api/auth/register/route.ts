import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models/user';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  await connectToDatabase();

  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email and password are required' }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ message: 'Server misconfiguration: JWT_SECRET missing' }, { status: 500 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: '7d' });

  return NextResponse.json(
    { token, user: { name: user.name, email: user.email } },
    { status: 201 }
  );
}
