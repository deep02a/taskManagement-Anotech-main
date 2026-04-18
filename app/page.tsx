import Link from 'next/link';
import { ArrowRight, CalendarCheck2, KanbanSquare, MessageSquareMore } from 'lucide-react';

const editorial = '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", serif';
const ui = '"Segoe UI", "Trebuchet MS", Verdana, sans-serif';

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 sm:px-8 lg:px-12" style={{ fontFamily: ui }}>
      <section className="animate-fade-in rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-amber-50 p-7 shadow-elegant sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Anotech Task Manager</p>
            <h1 className="mt-5 text-5xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl" style={{ fontFamily: editorial }}>
              A calmer way
              <span className="mt-1 block text-cyan-700">to keep work moving.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              This is a simple task manager for teams that are tired of losing track of work across chats,
              notes, and half-finished spreadsheets. Put tasks in one place, assign them clearly, and keep the
              next step visible.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Create an account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Sign in
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-sm font-semibold text-slate-900">Use it to</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <KanbanSquare className="mt-0.5 h-4 w-4 text-cyan-700" />
                <span>See what is waiting, what is in progress, and what is done without asking around.</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarCheck2 className="mt-0.5 h-4 w-4 text-cyan-700" />
                <span>Give every task an owner and a due date so work does not drift.</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquareMore className="mt-0.5 h-4 w-4 text-cyan-700" />
                <span>Cut down on status updates because the board already shows what changed.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Getting started', value: '3 min', note: 'to create an account and your first board' },
          { label: 'Ways to view work', value: '3', note: 'dashboard, task list, and kanban board' },
          { label: 'Team habit', value: '1 place', note: 'to check what matters next' },
        ].map((item, index) => (
          <article
            key={item.label}
            className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-4xl leading-none text-slate-900" style={{ fontFamily: editorial }}>{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-900 px-7 py-10 text-white sm:px-10">
        <h2 className="text-3xl leading-tight sm:text-4xl" style={{ fontFamily: editorial }}>
          Good tools should feel easy to return to.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          That is the point here. No overblown language, no complicated setup, just a clean place to keep work from
          getting lost.
        </p>
        <Link
          href="/register"
          className="mt-7 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Create your first board
        </Link>
      </section>
    </main>
  );
}
