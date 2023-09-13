import { Song } from '@/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    // Setting selected song
    player.setId(id);
    // Creating a playlist of all songs from place where user clicked
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
