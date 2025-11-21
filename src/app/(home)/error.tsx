'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center">Events konnten nicht geladen werden!</h2>
      <button
        className="mt-4 rounded-md border bg-blue-600 px-4 py-2 text-sm text-white
          transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Versuch es noch einmal
      </button>
    </main>
  );
}
