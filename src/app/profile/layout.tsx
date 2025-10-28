// app/profile/layout.tsx (Server Component)
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/app/server/auth';

export const dynamic = 'force-dynamic'; // be explicit: no static caching

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This check guards all child pages
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/sign-in');
  return <>{children}</>;
}
