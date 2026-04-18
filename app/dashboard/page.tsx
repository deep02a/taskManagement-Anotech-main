'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '../../components/site-header';
import { apiBaseUrl } from '../../lib/api';
import type { Task } from '../../types';
import { getToken, logout } from '../../lib/auth';
import { CheckSquare, Clock, AlertCircle, Plus, Grid, Kanban, ArrowRight } from 'lucide-react';

const statusOptions = [
  { label: 'All Tasks', value: '', icon: CheckSquare },
  { label: 'To Do', value: 'todo', icon: AlertCircle },
  { label: 'In Progress', value: 'in-progress', icon: Clock },
  { label: 'Done', value: 'done', icon: CheckSquare },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = getToken();

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      logout();
      return;
    }
  }, [token]);

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
    fetchTasks();
  }, []);

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }), [tasks]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <SiteHeader />
      <section className="mt-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-lg text-slate-600">Welcome to your task management center</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'from-blue-500 to-blue-600', icon: CheckSquare },
            { label: 'To Do', value: stats.todo, color: 'from-slate-500 to-slate-600', icon: AlertCircle },
            { label: 'In Progress', value: stats.inProgress, color: 'from-yellow-500 to-orange-600', icon: Clock },
            { label: 'Completed', value: stats.done, color: 'from-green-500 to-teal-600', icon: CheckSquare },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl bg-gradient-to-r ${stat.color} p-6 text-white shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 opacity-80" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/add-task"
            className="group rounded-2xl bg-white p-8 shadow-elegant transition hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-teal-600">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Add New Task</h3>
                <p className="mt-2 text-slate-600">Create and assign new tasks to your team</p>
              </div>
              <ArrowRight className="h-6 w-6 text-slate-400 transition group-hover:text-slate-600" />
            </div>
          </Link>

          <Link
            href="/tasks"
            className="group rounded-2xl bg-white p-8 shadow-elegant transition hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <Grid className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">View Tasks</h3>
                <p className="mt-2 text-slate-600">Browse and manage all your tasks in a grid layout</p>
              </div>
              <ArrowRight className="h-6 w-6 text-slate-400 transition group-hover:text-slate-600" />
            </div>
          </Link>

          <Link
            href="/kanban"
            className="group rounded-2xl bg-white p-8 shadow-elegant transition hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                  <Kanban className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Kanban Board</h3>
                <p className="mt-2 text-slate-600">Visualize and drag tasks through your workflow</p>
              </div>
              <ArrowRight className="h-6 w-6 text-slate-400 transition group-hover:text-slate-600" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
