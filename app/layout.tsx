import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anotech Task Manager',
  description: 'Enterprise-grade task management platform for teams',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
          {children}
        </div>
      </body>
    </html>
  );
}
