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
      className="w-full sm:w-auto relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className="object-cover"
          fill
          src={img}
          alt="Image"
        />
      </div>
      <p className="font-medium py-5">{name}</p>
    </button>
  );
};

export default ListItem;
