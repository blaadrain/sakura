'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';

type ListItemProps = {
  img: string;
  name: string;
  href: string;
};

const ListItem: React.FC<ListItemProps> = ({ img, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    // Add authentication before push
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className="object-cover"
          fill
          src={img}
          alt="Image"
        />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition xl:opacity-0 rounded-full flex justify-center items-center p-3 bg-black drop-shadow-md right-5 hover:opacity-75 xl:group-hover:opacity-100 xl:hover:scale-110">
        <FaPlay
          size={22}
          className="ml-[3px]"
        />
      </div>
    </button>
  );
};

export default ListItem;
