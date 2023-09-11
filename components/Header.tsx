'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: reset any playing songs
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
          <button className="rounded-full p-4 bg-black flex justify-center items-center hover:opacity-75 transition">
            <HiHome
              size={36}
              className="text-white"
            />
          </button>
          <button className="rounded-full p-4 bg-black flex justify-center items-center hover:opacity-75 transition">
            <BiSearch
              size={36}
              className="text-white"
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogOut}
                className="bg-white px-8 py-4"
              >
                Log Out
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className="bg-white w-auto p-4"
              >
                <FaUserAlt size={25} />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent text-neutral-200 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-white px-8 py-4 font-medium"
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
