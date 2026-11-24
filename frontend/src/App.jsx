import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {user.role === 'superadmin' ? (
          <AdminDashboard currentUser={user} />
        ) : (
          <EmployeeDashboard currentUser={user} onProfileUpdated={setUser} />
        )}
      </main>
    </div>
  );
}
