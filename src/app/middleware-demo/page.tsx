import { headers } from 'next/headers';
import Link from 'next/link';

export default async function MiddlewarePage() {
  // Access headers set by middleware
  const headersList = await headers();
  const customHeader = headersList.get('X-Custom-Header');
  const middlewareApplied = headersList.get('X-Middleware-Applied');
  const visitTime = headersList.get('X-Visit-Time');

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
            Middleware
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Middleware in Next.js runs before a request is completed, allowing you to 
            modify requests, responses, redirect, rewrite, and more.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Middleware Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Middleware Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Custom Header:</span>
                <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  {customHeader || 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Middleware Applied:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  middlewareApplied 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {middlewareApplied ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">Visit Time:</span>
                <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  {visitTime ? new Date(visitTime).toLocaleString() : 'Not set'}
                </span>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Middleware Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Run code before a request is completed
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Modify request and response headers
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Redirect or rewrite requests
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Authentication and authorization
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Logging and analytics
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                A/B testing and feature flags
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Common Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  🔐 Authentication
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Check user authentication before allowing access to protected routes.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  🔄 Redirects
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Redirect users based on location, device, or other conditions.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  📊 Analytics
                </h3>
                <p className="text-purple-700 dark:text-purple-300 text-sm">
                  Log requests, track user behavior, and collect metrics.
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  🧪 A/B Testing
                </h3>
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  Serve different content variations to different users.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Try Middleware Features
            </h2>
            <div className="space-y-3">
              <Link 
                href="/middleware-demo"
                className="block p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
              >
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  🔄 Refresh this page
                </span>
                <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
                  See how middleware adds headers on every request
                </p>
              </Link>
              
              <Link 
                href="/old-page"
                className="block p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
              >
                <span className="text-green-800 dark:text-green-200 font-medium">
                  ↩️ Try redirect demo
                </span>
                <p className="text-green-600 dark:text-green-300 text-sm mt-1">
                  Visit /old-page to see middleware redirect in action
                </p>
              </Link>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Example (middleware.ts)
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom header
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'Value');
  
  // Redirect example
  if (request.nextUrl.pathname === '/old-page') {
    return NextResponse.redirect(
      new URL('/new-page', request.url)
    );
  }
  
  // Authentication check
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};`}
              </code>
            </pre>
          </div>

          {/* Performance Note */}
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              ⚡ Performance Note
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Middleware runs on every matching request, so keep it lightweight and fast. 
              Heavy computations should be moved to API routes or server components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}