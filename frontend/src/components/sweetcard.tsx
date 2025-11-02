import React from 'react';

export default function SweetCard({ sweet, onPurchase }: { sweet: any; onPurchase: () => void }) {
  return (
    <div className="card">
      <h4>{sweet.name}</h4>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>In stock: {sweet.quantity}</p>
      <button onClick={onPurchase} disabled={sweet.quantity <= 0}>Purchase</button>
    </div>
  );
}
