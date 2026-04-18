'use client';

import { useState } from 'react';
import { apiBaseUrl, TaskPayload } from '../lib/api';
import { Plus, Calendar, User, FileText, Tag } from 'lucide-react';

export default function TaskForm({ onCreate }: { onCreate: () => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskPayload['status']>('todo');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, status, assigneeEmail: assigneeEmail || undefined }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not create task');
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('todo');
      setAssigneeEmail('');
      onCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create New Task</h2>
        </div>
        <p className="text-slate-600">Add clear scope, ownership, and status in one pass.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <FileText className="h-4 w-4" />
            Task Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="Enter task title"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <Tag className="h-4 w-4" />
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            rows={4}
            placeholder="Describe the task in detail"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <Calendar className="h-4 w-4" />
            Due Date
          </label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <Tag className="h-4 w-4" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskPayload['status'])}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <User className="h-4 w-4" />
            Assign to (Email)
          </label>
          <input
            type="email"
            value={assigneeEmail}
            onChange={(e) => setAssigneeEmail(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder-slate-400 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            placeholder="Optional: Enter team member's email"
          />
        </div>
      </div>
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Creating Task...' : 'Create Task'}
      </button>
    </form>
  );
}
