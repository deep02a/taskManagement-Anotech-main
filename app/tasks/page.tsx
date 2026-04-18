'use client';

import { useEffect, useMemo, useState } from 'react';
import SiteHeader from '../../components/site-header';
import TaskCard from '../../components/task-card';
import { apiBaseUrl } from '../../lib/api';
import type { Task } from '../../types';
import { getToken, logout } from '../../lib/auth';
import { Filter, CheckSquare, Clock, AlertCircle, Plus, KanbanSquare, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const statusOptions = [
  { label: 'All Tasks', value: '', icon: CheckSquare },
  { label: 'To Do', value: 'todo', icon: AlertCircle },
  { label: 'In Progress', value: 'in-progress', icon: Clock },
  { label: 'Done', value: 'done', icon: CheckSquare },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  const filteredTasks = useMemo(
    () => (statusFilter ? tasks.filter((task) => task.status === statusFilter) : tasks),
    [statusFilter, tasks]
  );

  async function handleDelete(taskId: string) {
    if (!token) return;
    await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  }

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }), [tasks]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <SiteHeader />
      <section className="mt-8 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Workspace</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Your Tasks</h1>
              <p className="mt-2 text-slate-600">Manage priorities, ownership, and progress from one clean grid.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/kanban"
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
              >
                <KanbanSquare className="h-4 w-4" />
                Open Kanban
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Tasks', value: stats.total, tone: 'text-slate-700', icon: LayoutGrid },
            { label: 'To Do', value: stats.todo, tone: 'text-slate-700', icon: AlertCircle },
            { label: 'In Progress', value: stats.inProgress, tone: 'text-cyan-700', icon: Clock },
            { label: 'Completed', value: stats.done, tone: 'text-emerald-700', icon: CheckSquare },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-7 w-7 ${stat.tone}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filter:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Link
            href="/kanban"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
          >
            <KanbanSquare className="h-4 w-4" />
            View Kanban Board
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"></div>
              <p className="mt-4 text-slate-600">Loading your tasks...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <CheckSquare className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No tasks found</h3>
            <p className="mt-2 text-slate-600">Create your first task to get started.</p>
            <Link
              href="/add-task"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              Add Your First Task
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} onUpdate={fetchTasks} onDelete={() => handleDelete(task._id)} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}