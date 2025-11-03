import { SignInButton } from '@/app/components/buttons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Das ist die Homepage</h1>
      <p className="mt-2 text-lg">Work in progress</p>
      <SignInButton />
    </main>
  );
}
