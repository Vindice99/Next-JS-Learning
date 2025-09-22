import Link from "next/link";
import { redirect } from "next/navigation";

// Server Actions - these run on the server
async function createPost(formData: FormData) {
  'use server';
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Simulate database save
  console.log('Creating post:', { title, content });
  
  // You could save to database here
  // await db.posts.create({ title, content });
  
  // Redirect after successful submission
  // redirect('/server-actions?success=true');
}

async function updateSettings(formData: FormData) {
  'use server';
  
  const theme = formData.get('theme') as string;
  const notifications = formData.get('notifications') === 'on';
  
  console.log('Updating settings:', { theme, notifications });
  
  // Simulate saving settings
  // await db.settings.update({ theme, notifications });
}

async function deleteItem(formData: FormData) {
  'use server';
  
  const itemId = formData.get('itemId') as string;
  
  console.log('Deleting item:', itemId);
  
  // Simulate deletion
  // await db.items.delete(itemId);
  
  redirect('/server-actions?deleted=true');
}

export default function ServerActionsPage({
  searchParams,
}: {
  searchParams: { success?: string; deleted?: string };
}) {
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
            Server Actions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Server Actions allow you to run server-side code directly from forms without 
            creating API routes. They provide a simple way to handle form submissions and mutations.
          </p>
        </div>

        {/* Success/Delete Messages */}
        {searchParams.success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
            ✅ Post created successfully using Server Action!
          </div>
        )}
        
        {searchParams.deleted && (
          <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
            🗑️ Item deleted successfully using Server Action!
          </div>
        )}

        <div className="grid gap-6">
          {/* Features Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Server Actions Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Run server-side code directly from forms
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No need to create separate API routes
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Use &apos;use server&apos; directive at the top of functions
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Handle form submissions with progressive enhancement
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Support redirects and revalidation
              </li>
            </ul>
          </div>

          {/* Create Post Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create Post (Server Action)
            </h3>
            <form action={createPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter post content"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Post
              </button>
            </form>
          </div>

          {/* Settings Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Update Settings (Server Action)
            </h3>
            <form action={updateSettings} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Theme
                </label>
                <select
                  name="theme"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notifications"
                  id="notifications"
                  className="rounded"
                />
                <label htmlFor="notifications" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Enable notifications
                </label>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Update Settings
              </button>
            </form>
          </div>

          {/* Delete Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Delete Item (Server Action with Redirect)
            </h3>
            <form action={deleteItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Item ID
                </label>
                <input
                  type="text"
                  name="itemId"
                  required
                  defaultValue="item-123"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter item ID"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Item
              </button>
            </form>
          </div>

          {/* Code Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Example
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-800 dark:text-gray-200">
{`// Server Action function
async function createPost(formData: FormData) {
  'use server';  // Required directive
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Server-side logic (database operations, etc.)
  await db.posts.create({ title, content });
  
  // Optional: redirect after success
  redirect('/posts');
}

// Use in JSX form
<form action={createPost}>
  <input name="title" required />
  <textarea name="content" required />
  <button type="submit">Create Post</button>
</form>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}