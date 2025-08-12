import { useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow dark:border-slate-800 dark:bg-slate-800">
        <h1 className="text-xl font-semibold">Login</h1>
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="w-full rounded bg-primary px-3 py-2 font-medium text-white disabled:opacity-50">{loading ? '...' : 'Login'}</button>
        <div className="text-sm">
          No account? <Link to="/register" className="text-primary">Register</Link>
        </div>
      </form>
    </div>
  );
}