// // app/profile/events/page.tsx

// import { headers } from 'next/headers';
// import { prisma } from '@/app/server/prisma';
// import { auth } from '@/app/server/auth';

// export default async function MyEventsPage() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   const userId = session!.user.id; // guarded by middleware
//   const events = await prisma.event.findMany({ where: { userId }, orderBy: { startsAt: 'asc' } });

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">My events</h1>
//       <ul className="space-y-2">
//         {events.map(e => (
//           <li key={e.id} className="border rounded p-3">
//             <div className="font-medium">{e.title}</div>
//             <div className="text-sm opacity-70">{e.startsAt.toISOString()}</div>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
