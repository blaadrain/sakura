import '@/public/globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import SideBar from '@/components/SideBar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sakura',
  description: 'Listen to music!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <SupabaseProvider>
          <UserProvider>
            <SideBar>{children}</SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
