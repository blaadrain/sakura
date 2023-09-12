'use client';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import LikeButton from './LikeButton';

type LibraryProps = {
  songs: Song[];
};

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const handleUpload = () => {
    if (!user) return authModal.onOpen();

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist
            size={26}
            className="text-neutral-400"
          />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUpload}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <div
            key="key={song.id}"
            className="flex justify-between items-center"
          >
            <MediaItem
              onClick={() => {}}
              song={song}
            />
            <div className="flex justify-center items-center p-2">
              <LikeButton songId={song.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
