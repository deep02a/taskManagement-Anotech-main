'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '../../components/site-header';
import KanbanBoard from '../../components/kanban-board';
import { apiBaseUrl } from '../../lib/api';
import type { Task } from '../../types';
import { getToken, logout } from '../../lib/auth';
import { Plus, LayoutGrid, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = getToken();

  async function fetchTasks() {
    if (!token) {
      logout();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBaseUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not load tasks');
      setTasks(data.tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchTasks();
  }, [token]);

  async function handleDelete(taskId: string) {
    if (!token) return;
    await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <SiteHeader />
        <div className="mt-8 flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-xl">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"></div>
            <p className="mt-4 text-slate-600">Loading kanban board...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <SiteHeader />
        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <SiteHeader />
      <section className="mt-8 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Kanban Board</h1>
            <p className="mt-2 text-slate-600">Visualize priorities and move work forward with confidence.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/tasks"
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            >
              <LayoutGrid className="h-4 w-4" />
              Grid View
            </Link>
            <Link
              href="/add-task"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </Link>
          </div>
          </div>
        </div>

        <KanbanBoard
          tasks={tasks}
          onUpdate={fetchTasks}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}