import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, name }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.message || 'Register failed');
      }
      setMsg('Registered! Now login.');
    } catch (err: any) {
      setMsg(err.message);
    }
  }
  return (
    <div className="card">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
