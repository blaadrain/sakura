import getFavoriteSongs from '@/actions/getFavoriteSongs';
import Header from '@/components/Header';
import Image from 'next/image';
import FavoriteContent from './components/FavoriteContent';

export const revalidate = 0;

const Favorite = async () => {
  const songs = await getFavoriteSongs();

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-6 mt-10 md:mt-16">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image
                fill
                alt="Playlist"
                className="object-cover rounded-lg"
                src="/images/liked.png"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-6 md:mt-0">
              <p className="hidden md:block text-neutral-400 font-semibold text-lg">
                Playlist
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Favorite songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <FavoriteContent songs={songs} />
    </div>
  );
};

export default Favorite;
