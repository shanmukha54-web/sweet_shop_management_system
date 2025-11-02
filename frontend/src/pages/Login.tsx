import React, { useState } from 'react';
import { apiFetch } from '../api';

export default function Login({ onLogin }: { onLogin: (token: string, role?: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Login failed');
      // Token returned
      const token = json.token;
      // decode role from token payload (quick and dirty)
      const payload = JSON.parse(atob(token.split('.')[1]));
      onLogin(token, payload.role);
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}
