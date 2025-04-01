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
      <nav className="bg-[#18181B] p-4">
        <ul className="flex justify-between items-center">
          <li className="flex">
            <Link href="/" className="text-white">
              <HomeIcon className="size-8 fill-white transition duration-200 ease-in-out hover:fill-[#A1A1AA] active:fill-[#71717A]"/>
            </Link>
            <Link href="/search" className="text-white">
              <MagnifyingGlassCircleIcon className="size-8 fill-white transition duration-200 ease-in-out hover:fill-[#A1A1AA] active:fill-[#71717A]"/>
            </Link>
          </li>
          <li>
            <Popover>
              <PopoverButton className="cursor-pointer flex items-center font-semibold text-white group focus:outline-none">
                <UserIcon className="size-8 fill-white transition duration-200 ease-in-out group-hover:fill-[#A1A1AA] group-data-[active]:fill-[#71717A]"/>
                <span className="group-hover:text-[#A1A1AA] transition duration-200 ease-in-out data-[active]:text-[#71717A] group-data-[active]:text-[#71717A]">
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
