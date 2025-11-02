import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('role') === 'ADMIN');

  const handleLogin = (tokenStr: string, role?: string) => {
    localStorage.setItem('token', tokenStr);
    if (role) localStorage.setItem('role', role);
    setToken(tokenStr);
    setIsAdmin(role === 'ADMIN');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setIsAdmin(false);
  };

  if (!token) {
    return (
      <div className="auth-wrapper">
        <h1>Sweet Shop</h1>
        <div className="auth-forms">
          <Login onLogin={handleLogin} />
          <Register />
        </div>
      </div>
    );
  }

  return <Dashboard token={token} onLogout={handleLogout} isAdmin={isAdmin} />;
}
