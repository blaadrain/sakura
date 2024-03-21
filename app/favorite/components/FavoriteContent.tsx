/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

type FavoriteContentProps = {
  songs: Song[];
};

const FavoriteContent: React.FC<FavoriteContentProps> = ({ songs }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { activeId } = usePlayer();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 pt-6 text-lg text-neutral-400">
        You don't have any favorite songs yet
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => {
                onPlay(id);
              }}
              song={song}
              isActive={song.id === activeId}
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <LikeButton songId={song.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteContent;
