'use client';

import Link from 'next/link';
import { logout } from '../lib/auth';
import { CheckCircle, LogOut, Home, Plus, Grid, Kanban } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-elegant">
      <Link href="/dashboard" className="flex items-center gap-3 transition hover:opacity-80">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Anotech</p>
          <h1 className="text-lg font-bold text-slate-900">Task Manager</h1>
        </div>
      </Link>
      <nav className="flex items-center gap-3">
        <Link
          href="/add-task"
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
        >
          <Grid className="h-4 w-4" />
          Tasks
        </Link>
        <Link
          href="/kanban"
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
        >
          <Kanban className="h-4 w-4" />
          Kanban
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:shadow-xl hover:scale-105"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </header>
  );
}
