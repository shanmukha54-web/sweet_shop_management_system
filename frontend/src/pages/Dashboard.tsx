import React, { useEffect, useState } from 'react';
import SweetCard from '../components/SweetCard';
import AdminPanel from '../components/AdminPanel';

export default function Dashboard({ token, onLogout, isAdmin }: { token: string; onLogout: () => void; isAdmin: boolean }) {
  const [sweets, setSweets] = useState<any[]>([]);
  const [q, setQ] = useState('');

  async function load() {
    const res = await fetch('http://localhost:4000/api/sweets', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setSweets(json);
  }

  useEffect(() => {
    load();
  }, []);

  async function handlePurchase(id: number) {
    await fetch(`http://localhost:4000/api/sweets/${id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quantity: 1 }),
    });
    load();
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/api/sweets/search?q=${encodeURIComponent(q)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setSweets(json);
  }

  return (
    <div className="container">
      <header>
        <h2>Sweet Shop</h2>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      <form onSubmit={handleSearch} className="search">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or category" />
        <button type="submit">Search</button>
        <button type="button" onClick={load}>Reset</button>
      </form>

      {isAdmin && <AdminPanel token={token} refresh={load} />}

      <div className="grid">
        {sweets.map(s => (
          <SweetCard key={s.id} sweet={s} onPurchase={() => handlePurchase(s.id)} />
        ))}
      </div>
    </div>
  );
}
