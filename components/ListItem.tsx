"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

type ListItemProps = {
  img: string;
  name: string;
  href: string;
};

const ListItem: React.FC<ListItemProps> = ({ img, name, href }) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="group relative flex w-full items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 transition hover:bg-neutral-100/20 sm:w-auto"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={img} alt="Image" />
      </div>
      <p className="py-5 font-medium">{name}</p>
    </button>
  );
};

export default ListItem;
