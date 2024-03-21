"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

type PageContentProps = {
  songs: Song[];
};

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { activeId } = usePlayer();

  if (songs.length === 0) {
    return <div className="mt-2 text-neutral-400">No songs available</div>;
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          song={song}
          isActive={song.id === activeId}
        />
      ))}
    </div>
  );
};

export default PageContent;
