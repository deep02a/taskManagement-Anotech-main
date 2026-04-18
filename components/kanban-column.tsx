'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './task-card';
import type { Task } from '../types';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export default function KanbanColumn({ id, title, color, tasks, onDelete }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[520px] flex-col rounded-2xl border ${color} bg-slate-50 p-4 transition-all duration-200 ${
        isOver ? 'ring-2 ring-cyan-400 ring-opacity-70' : 'ring-0'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={() => Promise.resolve()} // This will be handled by the board
              onDelete={async () => await onDelete(task._id)}
            />
          ))}
        </SortableContext>
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-slate-400">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-xl">+</span>
            </div>
            <p className="text-sm">Drop a task here</p>
          </div>
        </div>
      )}
    </div>
  );
}