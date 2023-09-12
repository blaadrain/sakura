'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import PlayButton from './PlayButton';
import LikeButton from './LikeButton';

type SongItemProps = {
  song: Song;
  onClick: (id: string) => void;
};

const SongItem: React.FC<SongItemProps> = ({ song, onClick }) => {
  const imgPath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className="relative group flex flex-col justify-center rounded-lg overflow-hidden gap-x-4 bg-neutral-300/5 cursor-pointer hover:bg-neutral-300/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-ful rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src={imgPath || '/images/liked.png'}
          fill
          alt="Song cover"
        />
      </div>
      <div className="flex justify-between items-center px-1 pt-5 pb-2">
        <div className="flex flex-col items-start gap-y-1">
          <p className="font-semibold truncate w-full">{song.title}</p>
          <p className="text-neutral-400 text-sm w-full truncate">
            {song.author}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
