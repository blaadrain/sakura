'use client';

import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import usePlayer from '@/hooks/usePlayer';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const player = usePlayer();
  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  return (
    <div
      className={twMerge(
        'h-fit bg-gradient-to-b from-[#ffb7c5] p-6',
        className
      )}
    >
      <div className="w-full mb-8 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full p-3 bg-black flex justify-center items-center hover:opacity-75 transition"
          >
            <RxCaretLeft
              size={40}
              className="text-white"
            />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full p-3 bg-black flex justify-center items-center hover:opacity-75 transition"
          >
            <RxCaretRight
              size={40}
              className="text-white"
            />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push('/')}
            className="rounded-full p-4 bg-white flex justify-center items-center hover:opacity-75 transition"
          >
            <HiHome
              size={36}
              className="text-black"
            />
          </button>
          <button className="rounded-full p-4 bg-white flex justify-center items-center hover:opacity-75 transition">
            <BiSearch
              onClick={() => router.push('/search')}
              size={36}
              className="text-black"
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogOut}
                className="hidden md:block bg-white px-8 py-4"
              >
                Log Out
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className="bg-white w-auto p-4"
              >
                <FaUserAlt size={32} />
              </Button>
            </div>
          ) : (
            <Button
              onClick={onOpen}
              className="bg-white px-8 py-4 font-medium"
            >
              Log In
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
