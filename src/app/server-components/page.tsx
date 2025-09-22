import Link from "next/link";

// This is a Server Component by default
// It runs on the server and can fetch data directly
async function fetchUserData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    users: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
      { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
      { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
    ],
    timestamp: new Date().toISOString(),
  };
}

export default async function ServerComponentsPage() {
  // Server Components can use async/await directly
  const { users, timestamp } = await fetchUserData();

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
            Server Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            This page demonstrates React Server Components in Next.js 15. Server Components 
            run on the server and can directly access databases, APIs, and the filesystem.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Server Components Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Run on the server, reducing client-side JavaScript bundle
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Can directly access databases and APIs without exposing credentials
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Support async/await for data fetching
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automatically cached and can use React Suspense
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                SEO-friendly with server-side rendering
              </li>
            </ul>
          </div>

          {/* Data Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Server-Fetched Data
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Fetched at: {new Date(timestamp).toLocaleString()}
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">ID</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Email</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-900 dark:text-white">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{user.id}</td>
                      <td className="py-2 px-4 text-gray-900 dark:text-white font-medium">{user.name}</td>
                      <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : user.role === 'Editor'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Example
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`// Server Component (default in app directory)
export default async function ServerComponent() {
  // This runs on the server
  const data = await fetch('https://api.example.com/data');
  const users = await data.json();
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
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