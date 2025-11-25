// // app/profile/events/page.tsx

import { headers } from 'next/headers';
import { auth } from '@/app/server/auth';

export default async function MyEventsPage() {
  // const session = await auth.api.getSession({ headers: await headers() });
  // const userId = session!.user.id; // guarded by middleware

  return <main className="p-6"></main>;
}
