'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function APIRoutesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });

  // Fetch users from API
  const fetchUsers = async (search?: string) => {
    setLoading(true);
    try {
      const url = search ? `/api/users?search=${encodeURIComponent(search)}` : '/api/users';
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users);
      setResponse(`GET /api/users - ${data.users.length} users found`);
    } catch {
      setResponse('Error fetching users');
    }
    setLoading(false);
  };

  // Create user
  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.age) {
      setResponse('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      
      if (res.ok) {
        setResponse(`POST /api/users - User created: ${data.user.name}`);
        setNewUser({ name: '', email: '', age: '' });
        fetchUsers(); // Refresh list
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch {
      setResponse('Error creating user');
    }
    setLoading(false);
  };

  // Delete all users
  const deleteUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users', { method: 'DELETE' });
      const data = await res.json();
      setResponse(`DELETE /api/users - ${data.message}`);
      setUsers([]);
    } catch {
      setResponse('Error deleting users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Routes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            This page demonstrates API Routes in Next.js 15 App Router. API routes are 
            defined using route.ts files and support all HTTP methods.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              API Routes Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Support GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS methods
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Use route.ts files in the app directory
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Access to NextRequest and NextResponse objects
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Built-in request parsing and response formatting
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Support for dynamic routes and middleware
              </li>
            </ul>
          </div>

          {/* Response Display */}
          {response && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                Last API Response:
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">{response}</p>
            </div>
          )}

          {/* Create User Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New User (POST /api/users)
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                placeholder="Age"
                value={newUser.age}
                onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={createUser}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>

          {/* API Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              API Controls
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => fetchUsers()}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Loading...' : 'Fetch Users (GET)'}
              </button>
              <button
                onClick={() => fetchUsers('john')}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                Search &quot;john&quot; (GET with params)
              </button>
              <button
                onClick={deleteUsers}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                Delete All Users (DELETE)
              </button>
            </div>
          </div>

          {/* Users Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Users ({users.length})
            </h3>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">ID</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Email</th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{user.id}</td>
                        <td className="py-2 px-4 text-gray-900 dark:text-white font-medium">{user.name}</td>
                        <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                        <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{user.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No users found.</p>
            )}
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Example (app/api/users/route.ts)
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  
  // Your logic here
  
  return NextResponse.json({ users, total });
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Create user logic
  
  return NextResponse.json(
    { message: 'User created', user },
    { status: 201 }
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}