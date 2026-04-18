'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types';
import { apiBaseUrl } from '../lib/api';
import { Clock, User, ArrowRight, Trash2, CheckCircle2, Circle, PlayCircle, GripVertical } from 'lucide-react';

export default function TaskCard({ task, onUpdate, onDelete }: { task: Task; onUpdate: () => Promise<void>; onDelete: () => Promise<void> }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function toggleStatus() {
    const nextStatus = task.status === 'todo' ? 'in-progress' : task.status === 'in-progress' ? 'done' : 'todo';
    await fetch(`${apiBaseUrl}/tasks/${task._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('task-manager-token')}` },
      body: JSON.stringify({ status: nextStatus }),
    });
    onUpdate();
  }

  const statusConfig = {
    todo: { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-100', label: 'To Do' },
    'in-progress': { icon: PlayCircle, color: 'text-blue-600', bg: 'bg-blue-100', label: 'In Progress' },
    done: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Done' },
  };

  const config = statusConfig[task.status];

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${
        isDragging ? 'rotate-1 opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${config.bg}`}>
              <config.icon className={`h-4 w-4 ${config.color}`} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{config.label}</span>
          </div>
          <h2 className="mb-2 text-lg font-bold text-slate-900">{task.title}</h2>
          <p className="mb-4 text-sm leading-6 text-slate-600">{task.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            {task.assigneeEmail && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {task.assigneeEmail}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={toggleStatus}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          <ArrowRight className="h-4 w-4" />
          Move to {task.status === 'todo' ? 'In Progress' : task.status === 'in-progress' ? 'Done' : 'To Do'}
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-300"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  );
}
