"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import Button from "@/components/Button";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";

const AccountContent = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const player = usePlayer();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div className="mb-7 px-6">
      <div className="flex flex-col gap-y-4">
        <p className="mb-4 text-xl text-neutral-400">
          You are currently on the free plan. Enjoy music!
        </p>
        <Button onClick={handleLogOut} className="w-full lg:w-[25%]">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default AccountContent;
