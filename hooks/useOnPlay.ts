import usePlayer from "./usePlayer";
import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();

  const onPlay = (id: string) => {
    // Setting selected song
    player.setId(id);
    // Creating a playlist of all songs from place where user clicked
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
