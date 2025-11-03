import Link from 'next/link';

export function SignInButton() {
  return (
    <Link
      href="/profile"
      className="cursor-pointer rounded bg-blue-700 px-2 py-1 font-bold text-white
        hover:bg-blue-500"
    >
      Sign In
    </Link>
  );
}
