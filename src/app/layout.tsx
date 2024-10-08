import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Loading local fonts
const geistSans = localFont({
  src: '/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Story Seeker',
  description: 'Say goodbye to endless searching',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen px-8 py-10`}
        style={{
          backgroundImage: 'linear-gradient(to bottom right, #AC87C5, #E3DDE8)'
        }}
      >
        {/* <div className="absolute inset-0 -z-10 mx-8 my-4 bg-[url('/images/bg.svg')]" /> */}

        <div
          className="flex flex-grow flex-col"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          <main className="flex flex-grow z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
