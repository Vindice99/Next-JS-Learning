import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Image
            className="mx-auto mb-8 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={200}
            height={50}
            priority
          />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Next.js 15 Learning Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore the latest features of Next.js 15 including App Router, Server Components, 
            Server Actions, Streaming, and more modern web development patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Server Components"
            description="Learn about React Server Components and how they improve performance by rendering on the server."
            href="/server-components"
            icon="🖥️"
          />
          
          <FeatureCard
            title="Client Components"
            description="Explore Client Components for interactive features that require browser APIs and state management."
            href="/client-components"
            icon="🎮"
          />
          
          <FeatureCard
            title="API Routes"
            description="Modern API routes with the App Router, including GET, POST, and other HTTP methods."
            href="/api-routes"
            icon="🔗"
          />
          
          <FeatureCard
            title="Server Actions"
            description="Handle form submissions and mutations directly on the server without API routes."
            href="/server-actions"
            icon="⚡"
          />
          
          <FeatureCard
            title="Streaming & Suspense"
            description="Progressive loading with React Suspense and streaming for better user experience."
            href="/streaming"
            icon="🌊"
          />
          
          <FeatureCard
            title="Middleware"
            description="Request/response middleware for authentication, redirects, and request modification."
            href="/middleware-demo"
            icon="🛡️"
          />
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
          <div className="flex justify-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              App Router
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href, icon }: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
        <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-200">
          Explore →
        </div>
      </div>
    </Link>
  );
}
