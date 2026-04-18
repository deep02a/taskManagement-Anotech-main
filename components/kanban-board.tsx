'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { apiBaseUrl } from '../lib/api';
import type { Task } from '../types';
import { getToken } from '../lib/auth';
import KanbanColumn from './kanban-column';
import TaskCard from './task-card';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdate: () => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export default function KanbanBoard({ tasks, onUpdate, onDelete }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', accent: 'border-slate-300', tasks: tasks.filter(t => t.status === 'todo') },
    { id: 'in-progress', title: 'In Progress', accent: 'border-cyan-300', tasks: tasks.filter(t => t.status === 'in-progress') },
    { id: 'done', title: 'Done', accent: 'border-emerald-300', tasks: tasks.filter(t => t.status === 'done') },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t._id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = tasks.some(t => t._id === activeId);
    const isOverTask = tasks.some(t => t._id === overId);

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      const activeIndex = tasks.findIndex(t => t._id === activeId);
      const overIndex = tasks.findIndex(t => t._id === overId);

      if (tasks[activeIndex].status !== tasks[overIndex].status) {
        const newStatus = tasks[overIndex].status;
        updateTaskStatus(activeId as string, newStatus);
      }
    }

    // Dropping a Task over a column
    const isOverColumn = columns.some(col => col.id === overId);
    if (isActiveTask && isOverColumn) {
      const newStatus = overId as Task['status'];
      updateTaskStatus(activeId as string, newStatus);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = tasks.some(t => t._id === activeId);
    const isOverColumn = columns.some(col => col.id === overId);

    if (isActiveTask && isOverColumn) {
      const newStatus = overId as Task['status'];
      updateTaskStatus(activeId as string, newStatus);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    const token = getToken();
    if (!token) return;

    try {
      setPendingTaskId(taskId);
      await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setPendingTaskId(null);
    }
  };

  return (
    <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700">{tasks.length} Total</span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700">{columns[0].tasks.length} To Do</span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-cyan-700">{columns[1].tasks.length} In Progress</span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-emerald-700">{columns[2].tasks.length} Done</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {pendingTaskId ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          {pendingTaskId ? 'Updating task...' : 'Board synced'}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.accent}
              tasks={column.tasks}
              onDelete={onDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-1 opacity-95">
              <TaskCard
                task={activeTask}
                onUpdate={onUpdate}
                onDelete={() => Promise.resolve()}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}