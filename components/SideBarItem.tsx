import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SideBarItemProps = {
  Icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

const SideBarItem: React.FC<SideBarItemProps> = ({
  Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        flex-row
        gap-x-4
        w-full
        h-auto
        item-end
        text-neutral-400
        text-md
        font-medium
        py-1
        hover:text-white
        transition
      `,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SideBarItem;
