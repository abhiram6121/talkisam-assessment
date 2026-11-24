import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
            user?.role === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {user?.role === 'superadmin' ? 'Super Admin' : 'Employee'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
