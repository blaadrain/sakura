import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

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
        item-end
        text-md
        flex
        h-auto
        w-full
        flex-row
        gap-x-4
        py-1
        font-medium
        text-neutral-400
        transition
        hover:text-white
      `,
        active && "text-white",
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default SideBarItem;
