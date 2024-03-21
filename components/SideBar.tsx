"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import Box from "./Box";
import Library from "./Library";
import SideBarItem from "./SideBarItem";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

type SideBarProps = {
  songs: Song[];
  children: React.ReactNode;
};

const SideBar: React.FC<SideBarProps> = ({ songs, children }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        Icon: HiHome,
        label: "Home",
        href: "/",
        active: pathname !== "/search",
      },
      {
        Icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname],
  );

  return (
    <div
      className={twMerge(
        "flex h-full",
        player.activeId && "h-[calc(100%-80px)]",
      )}
    >
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 p-4">
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item}></SideBarItem>
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto p-0 md:py-2 md:pr-2">
        {children}
      </main>
    </div>
  );
};

export default SideBar;
