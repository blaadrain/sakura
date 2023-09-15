import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import '@/public/globals.css';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';
import SideBar from '@/components/SideBar';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import SupabaseProvider from '@/providers/SupabaseProvider';

export const revalidate = 0;

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sakura',
  description: 'Listen to music!',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar songs={userSongs}>{children}</SideBar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
