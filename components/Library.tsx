"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import MediaItem from "./MediaItem";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";

type LibraryProps = {
  songs: Song[];
};

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { activeId } = usePlayer();
  const onPlay = useOnPlay(songs);

  const handleUpload = () => {
    if (!user) return authModal.onOpen();
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-md font-medium text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUpload}
          size={20}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={(id: string) => {
              onPlay(id);
            }}
            song={song}
            isActive={song.id === activeId}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
