import Image from "next/image";

import FavoriteContent from "./components/FavoriteContent";
import getFavoriteSongs from "@/actions/getFavoriteSongs";
import Header from "@/components/Header";

export const revalidate = 0;

const Favorite = async () => {
  const songs = await getFavoriteSongs();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto bg-neutral-900 md:rounded-lg">
      <Header>
        <div className="mb-6 mt-10 md:mt-16">
          <div className="flex flex-col items-center gap-x-5 md:flex-row">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                alt="Playlist"
                className="rounded-lg object-cover"
                src="/images/liked.png"
              />
            </div>
            <div className="mt-6 flex flex-col gap-y-2 md:mt-0">
              <p className="hidden text-lg font-semibold text-neutral-400 md:block">
                Playlist
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
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
