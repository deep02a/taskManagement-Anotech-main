'use client';

import { useState } from 'react';
import SiteHeader from '../../components/site-header';
import TaskForm from '../../components/task-form';
import { CheckCircle2, KanbanSquare } from 'lucide-react';
import Link from 'next/link';

export default function AddTaskPage() {
  const [success, setSuccess] = useState(false);

  async function handleCreate() {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      <SiteHeader />
      <section className="mt-8 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Workspace</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Add New Task</h1>
              <p className="mt-2 text-slate-600">Capture work clearly so it flows naturally into your board.</p>
            </div>
            <Link
              href="/kanban"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
            >
              <KanbanSquare className="h-4 w-4" />
              Open Kanban
            </Link>
          </div>
        </div>

        {success && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="font-medium text-emerald-800">Task created successfully.</p>
            </div>
          </div>
        )}

        <TaskForm onCreate={handleCreate} />
      </section>
    </main>
  );
}