"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

type LikeButtonProps = {
  songId: string;
  hidden?: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({ songId, hidden }) => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("favorite_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  if (hidden) return null;

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("favorite_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success("Removed from your favorites");
      }
    } else {
      const { error } = await supabaseClient
        .from("favorite_songs")
        .insert({ song_id: songId, user_id: user.id });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Added to your favorites");
      }
    }

    router.refresh();
  };

  return (
    <button onClick={handleLike} className="transition hover:opacity-75">
      <Icon color={isLiked ? "#1db954" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
