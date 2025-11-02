import React, { useState } from 'react';

export default function AdminPanel({ token, refresh }: { token: string; refresh: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');

  async function add(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:4000/api/sweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, category, price: Number(price), quantity: Number(quantity) }),
    });
    setName(''); setCategory(''); setPrice(''); setQuantity('');
    refresh();
  }

  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      <form onSubmit={add}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} />
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        <button type="submit">Add Sweet</button>
      </form>
    </div>
  );
}
