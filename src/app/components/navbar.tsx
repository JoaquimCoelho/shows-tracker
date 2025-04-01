"use server";

import Link from "next/link";
import React from "react";
import Image from 'next/image'
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { SignIn } from "@stackframe/stack";
//import { ColorModeSwitcher } from "@/app/components/theme-switcher";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

type Props = {
  loggedIn: boolean;
};

export const NavBar: React.FC<Props> = async ({ loggedIn }) => {
  return (
    <>
      <nav className="bg-[#18181B] p-4">
        <ul className="flex justify-between items-center">
          <li className="flex">
            <Link href="/" className="text-white">
              <HomeIcon className="size-8 transition duration-200 ease-in-out"/>
            </Link>
            <Link href="/search" className="text-white">
              <MagnifyingGlassIcon className="size-8 transition duration-200 ease-in-out"/>
            </Link>
          </li>
          <li>
            <Link href="https://mvg.lol" target="_blank" passHref={true}>
              <Image className="cursor-pointer"
                src="/MVG.png"
                width={50}
                height={32}
                alt="mvg"
              />
            </Link>
          </li>
          <li>
            <Popover>
              <PopoverButton className="cursor-pointer flex items-center font-semibold text-white focus:outline-none">
                <UserIcon className="size-8 transition duration-200 ease-in-out"/>
                <span className="group-hover:text-[#A1A1AA] transition duration-200 ease-in-out data-[active]:text-[#71717A]">
                  {loggedIn ? "Account" : "Sign In"}
                </span>
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className="w-sm mt-7.5 p-7.5 rounded bg-[#18181B] transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0">
                <SignIn />
              </PopoverPanel>
            </Popover>
          </li>
        </ul>
      </nav>
    </>
  );
};
