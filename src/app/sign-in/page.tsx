'use client';

/* 
This is the sign in page. It can be accessed through the sign-in button on the homepage. 
Users without a session cookie are redirected here when accessing profile/ pages.
*/

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/app/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    try {
      const { error } = await signIn.email({
        email,
        password,
        // rememberMe: true,
        // callbackURL: '/dashboard', // optional
      });
      if (error) throw error;
      // Signed in – go to profile page
      // Use replace to not create history entry for sign-in page
      router.replace('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err?.message);
      else setErrorMessage('Failed to sign in');
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center p-6">
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
      {errorMessage && <p className="mt-3 text-red-600">{errorMessage}</p>}
    </main>
  );
}
