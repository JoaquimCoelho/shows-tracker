"use server";

import Link from "next/link";
import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { SignIn } from "@stackframe/stack";
//import { ColorModeSwitcher } from "@/app/components/theme-switcher";
import {
  HomeIcon,
  MagnifyingGlassCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

type Props = {
  loggedIn: boolean;
};

export const NavBar: React.FC<Props> = async ({ loggedIn }) => {
  return (
    <>
      <nav className="bg-purple-900 p-4">
        <ul className="flex justify-between items-center">
          <li className="flex">
            <Link href="/" className="text-white">
              <HomeIcon className="size-8 fill-white/75"/>
            </Link>
            <Link href="search" className="text-white">
              <MagnifyingGlassCircleIcon className="size-8 fill-white/75"/>
            </Link>
          </li>
          <li>
            <Popover>
              <PopoverButton className="flex block font-semibold text-white focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
              <UserIcon className="size-8 fill-white/75"/>{loggedIn ? "Account" : "Sign In"}
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className="w-sm p-2.5 rounded bg-gray-900 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0">
                <SignIn />
              </PopoverPanel>
            </Popover>
          </li>
        </ul>
      </nav>
    </>
  );
};
