'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiBaseUrl } from '../../lib/api';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      localStorage.setItem('task-manager-token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 p-3">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">Join thousands of teams managing tasks efficiently</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-elegant">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pl-10 text-sm placeholder-slate-400 transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  placeholder="Enter your full name"
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pl-10 text-sm placeholder-slate-400 transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pl-10 pr-10 text-sm placeholder-slate-400 transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  placeholder="Create a password"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-purple-600 hover:text-purple-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
