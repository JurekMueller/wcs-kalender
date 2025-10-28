import { auth } from '@/app/server/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  // Ask Better Auth for the current session using the incoming request headers
  const session = await auth.api.getSession({
    headers: await headers(), // required for cookie-based session on server
  });

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
      <p>Welcome, {session!.user.name ?? session!.user.email}!</p>
    </main>
  );
}
