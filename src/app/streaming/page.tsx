import { Suspense } from 'react';
import Link from 'next/link';

// Simulate slow data fetching
async function SlowComponent({ delay, title }: { delay: number; title: string }) {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>This component took {delay}ms to load and was streamed to the client.</p>
      <p className="text-sm mt-2 opacity-80">
        Loaded at: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}

// Fast loading component
async function FastComponent() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return (
    <div className="bg-green-500 text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Fast Component</h3>
      <p>This component loads quickly (100ms) and appears first.</p>
    </div>
  );
}

// Very slow component
async function VerySlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  return (
    <div className="bg-red-500 text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Very Slow Component</h3>
      <p>This component takes 4 seconds to load, demonstrating streaming UX.</p>
      <div className="mt-4 p-3 bg-red-600 rounded">
        <p className="text-sm">
          Even though this took 4 seconds, the rest of the page was usable immediately!
        </p>
      </div>
    </div>
  );
}

// Loading components
function ComponentSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}

function SlowSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-6 rounded-lg">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
  );
}

export default function StreamingPage() {
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
            Streaming & Suspense
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Next.js 15 supports streaming with React Suspense, allowing parts of your page 
            to load progressively while keeping the rest of the page interactive.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Streaming Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Progressive page loading with React Suspense
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Immediate interactivity for loaded components
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Fallback UI while components are loading
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Improved perceived performance and user experience
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automatic with Next.js App Router
              </li>
            </ul>
          </div>

          {/* Streaming Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Live Streaming Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The components below load at different speeds. Notice how the page remains 
              interactive while slower components are still loading.
            </p>
            
            <div className="grid gap-6">
              {/* Fast loading component */}
              <Suspense fallback={<ComponentSkeleton />}>
                <FastComponent />
              </Suspense>

              {/* Medium speed component */}
              <Suspense fallback={<ComponentSkeleton />}>
                <SlowComponent delay={1500} title="Medium Speed Component" />
              </Suspense>

              {/* Another medium speed component */}
              <Suspense fallback={<ComponentSkeleton />}>
                <SlowComponent delay={2500} title="Slower Component" />
              </Suspense>

              {/* Very slow component */}
              <Suspense fallback={<SlowSkeleton />}>
                <VerySlowComponent />
              </Suspense>
            </div>
          </div>

          {/* Interactive Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              This Content is Immediately Interactive
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Even while the components above are still loading, you can interact with this content.
              This demonstrates the power of streaming - your users don&apos;t have to wait for the 
              entire page to load before they can start using it.
            </p>
            <div className="space-y-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Click me! (I work immediately)
              </button>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <input 
                  type="text" 
                  placeholder="Type here while components load above..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Example
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`import { Suspense } from 'react';

// Slow loading component
async function SlowComponent() {
  await fetch('https://api.example.com/slow-data');
  return <div>Slow content loaded!</div>;
}

// Loading fallback
function LoadingSkeleton() {
  return <div className="animate-pulse bg-gray-200 h-20" />;
}

// Page with streaming
export default function Page() {
  return (
    <div>
      <h1>This loads immediately</h1>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>
      
      <p>This is also immediately available</p>
    </div>
  );
}`}
              </code>
            </pre>
          </div>

          {/* Performance Tips */}
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
              💡 Performance Tips
            </h3>
            <ul className="space-y-2 text-yellow-700 dark:text-yellow-300 text-sm">
              <li>• Wrap slow components with Suspense boundaries</li>
              <li>• Provide meaningful loading states for better UX</li>
              <li>• Consider splitting data fetching into multiple components</li>
              <li>• Use nested Suspense boundaries for granular loading</li>
              <li>• Keep fast content outside Suspense boundaries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}