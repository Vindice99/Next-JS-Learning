import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom header to all responses
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'NextJS-Learning-Middleware');
  
  // Log request information
  console.log(`${request.method} ${request.url} - ${new Date().toISOString()}`);
  
  // Example: Redirect based on conditions
  if (request.nextUrl.pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url));
  }
  
  // Example: Block access to admin without proper header
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }
  
  // Example: Modify request for specific paths
  if (request.nextUrl.pathname.startsWith('/middleware-demo')) {
    // Add a custom header that components can read
    response.headers.set('X-Middleware-Applied', 'true');
    response.headers.set('X-Visit-Time', new Date().toISOString());
  }
  
  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};