'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import PlayButton from './PlayButton';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';

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
        'relative group border-2 border-transparent flex flex-col justify-center rounded-lg overflow-hidden gap-x-4 bg-neutral-300/5 cursor-pointer hover:bg-neutral-300/10 transition p-2',
        isActive && 'border-[#ffb7c5]'
      )}
    >
      <div className="relative aspect-square w-full h-ful rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src={imgPath || '/images/liked.png'}
          fill
          alt="Song cover"
        />
      </div>
      <div className="flex flex-col justify-between items-center px-1 pt-5 pb-2">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
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
