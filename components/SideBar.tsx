'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SideBarItem from './SideBarItem';
import Library from './Library';

type SideBarProps = {
  children: React.ReactNode;
};

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        Icon: HiHome,
        label: 'Home',
        href: '/',
        active: pathname !== '/search',
      },
      {
        Icon: BiSearch,
        label: 'Search',
        href: '/search',
        active: pathname === '/search',
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 p-4">
            {routes.map((item) => (
              <SideBarItem
                key={item.label}
                {...item}
              ></SideBarItem>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default SideBar;