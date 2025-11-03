'use client';

import { signOut } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () =>
        await signOut({ fetchOptions: { onSuccess: () => router.push('/') } })
      }
      className="cursor-pointer rounded bg-blue-700 px-2 py-1 font-bold text-white
        hover:bg-blue-500"
    >
      Sign Out
    </button>
  );
}
