'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/app/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        // rememberMe: true,
        // callbackURL: '/dashboard', // optional – we’ll push manually below
      });

      if (error) throw error;
      // Signed in – go to your protected page
      router.push('/profile');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to sign in');
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-semibold">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded border p-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="********"
          className="w-full rounded border p-2"
          required
        />
        <button
          disabled={pending}
          className="w-full rounded border p-2 disabled:opacity-50"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </main>
  );
}
