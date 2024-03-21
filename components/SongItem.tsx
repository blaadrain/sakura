"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import PlayButton from "./PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

type SongItemProps = {
  song: Song;
  isActive: boolean;
  onClick: (id: string) => void;
};

const SongItem: React.FC<SongItemProps> = ({ song, isActive, onClick }) => {
  const imgPath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className={twMerge(
        "group relative flex cursor-pointer flex-col justify-center gap-x-4 overflow-hidden rounded-lg border-2 border-transparent bg-neutral-300/5 p-2 transition hover:bg-neutral-300/10",
        isActive && "border-emerald-800",
      )}
    >
      <div className="h-ful relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          className="object-cover"
          src={imgPath || "/images/liked.png"}
          fill
          alt="Song cover"
        />
      </div>
      <div className="flex flex-col items-center justify-between px-1 pb-2 pt-5">
        <p className="w-full truncate font-semibold">{song.title}</p>
        <p className="w-full truncate text-sm text-neutral-400">
          {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
