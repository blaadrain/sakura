"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

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

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className,
      )}
    >
      <div className="mb-8 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full bg-black p-3 transition hover:opacity-75"
          >
            <RxCaretLeft size={32} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center rounded-full bg-black p-3 transition hover:opacity-75"
          >
            <RxCaretRight size={32} className="text-white" />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center rounded-full bg-black p-4 transition hover:opacity-75"
          >
            <HiHome size={24} className="text-white" />
          </button>
          <button className="flex items-center justify-center rounded-full bg-black p-4 transition hover:opacity-75">
            <BiSearch
              onClick={() => router.push("/search")}
              size={24}
              className="text-white"
            />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <Button
              onClick={() => router.push("/account")}
              className="w-auto bg-black p-4"
            >
              <FaUserAlt className="text-white" size={22} />
            </Button>
          ) : (
            <Button
              onClick={onOpen}
              className="h-[56px] bg-black px-6 py-3 font-medium"
            >
              <span className="text-white">Log In</span>
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
