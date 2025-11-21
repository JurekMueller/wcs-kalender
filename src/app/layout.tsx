import type { Metadata } from 'next';
import { Geist, Lora, Fira_Code } from 'next/font/google';
import './globals.css';
import { ApolloProvider } from '@/app/apollo-client/apollo-client-provider';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const firaMono = Fira_Code({
  variable: '--font-mono',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WCS Kalender',
  description: 'West Coast Swing Events',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${firaMono.variable} ${lora.variable} antialiased`}
      >
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
