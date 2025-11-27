import { SignInButton } from '@/app/components/buttons';
import { EventTable } from '@/app/components/event-table';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">WCS Kalender Bern</h1>
      <p className="mt-2 text-lg">Work in progress</p>
      <SignInButton />
      <Suspense fallback={<div>Loading events…</div>}>
        <EventTable />
      </Suspense>
    </main>
  );
}
