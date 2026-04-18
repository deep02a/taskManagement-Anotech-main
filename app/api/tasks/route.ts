import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Task } from '@/lib/models/task';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find().sort({ createdAt: -1 });
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const { title, description, status, dueDate, assigneeEmail } = await request.json();

  if (!title || !description || !dueDate || !status) {
    return NextResponse.json(
      { message: 'Title, description, status, and due date are required' },
      { status: 400 }
    );
  }

  if (!['todo', 'in-progress', 'done'].includes(status)) {
    return NextResponse.json({ message: 'Invalid task status' }, { status: 400 });
  }

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    dueDate,
    assigneeEmail: assigneeEmail?.trim() || undefined,
  });

  return NextResponse.json({ task }, { status: 201 });
}
