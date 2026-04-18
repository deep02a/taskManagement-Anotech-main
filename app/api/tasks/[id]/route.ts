import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Task } from '@/lib/models/task';

export const runtime = 'nodejs';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const updates = await request.json();
  const { id } = await params;

  if (updates.status && !['todo', 'in-progress', 'done'].includes(updates.status)) {
    return NextResponse.json({ message: 'Invalid task status' }, { status: 400 });
  }

  const task = await Task.findByIdAndUpdate(id, updates, { new: true });

  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Task deleted' });
}
