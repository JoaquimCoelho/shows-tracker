"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TVShowDetails } from "@/app/custom-types/show";
import { useUser } from "@stackframe/stack";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  TrashIcon,
  TvIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/16/solid";

export default function ShowPage() {
  const { id } = useParams() as { id: string };
  const [show, setShow] = useState<TVShowDetails | null>(null);
  const allStatuses = ["watching", "watched", "dropped", "planning"];
  const user = useUser();
  let bool: boolean = true;
  allStatuses.map((statusName) =>
    user?.clientMetadata?.[statusName]?.includes(show?.id)
      ? (bool = false)
      : null,
  );

  useEffect(() => {
    const fetchShow = async () => {
      const res = await fetch(`/api/show?id=${id}`);
      const data = await res.json();
      setShow(data);
    };
    fetchShow();
  }, [id]);

  const currentClientMetadata = user?.clientMetadata || {};

  const handleStatus = async (status: string, show: TVShowDetails) => {
    const currentStatusData = currentClientMetadata[status] || [];
    const updatedMetadata = allStatuses.reduce((acc, currStatus: string) => {
      if (currStatus !== status) {
        // @ts-expect-error its 1 am n quero dar fix
        acc[currStatus] = (currentClientMetadata[currStatus] || []).filter(
          (id: number) => id !== show.id,
        );
      } else {
        // @ts-expect-error its 1 am n quero dar fix
        acc[currStatus] = [...currentStatusData, show.id];
      }
      return acc;
    }, {});

    try {
      await user?.update({
        clientMetadata: {
          ...updatedMetadata,
        },
      });
    } catch (error) {
      console.error("Failed to update user metadata:", error);
    }
  };

  if (!show){
    return <div className="text-center text-purple-900">Loading...</div>;
  }else{
    return (
      <div className="flex mx-auto bg-gray-900 p-6 rounded shadow">
        <div className="w-1/3">
          <img
            src={"https://image.tmdb.org/t/p/w500/" + show.poster_path}
            alt={show.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-2/3 pl-6">
          <h1 className="text-3xl mb-4">{show.name}</h1>
          <p className="mb-4">{show.overview}</p>
          <p className="mb-4">First aired: {show.first_air_date}</p>
          <p className="mb-4">Rating: {show.vote_average}</p>
          {user && (
            <div className="w-52">
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md border-1 border-white py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                  {allStatuses.map((statusName) =>
                    user.clientMetadata?.[statusName]?.includes(show.id) ? (
                      <p key={statusName}>
                        {statusName.charAt(0).toUpperCase() + statusName.slice(1)}
                      </p>
                    ) : null,
                  )}
                  {bool && <p>Not Watched</p>}

                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom start"
                  className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button
                      name="watched"
                      onClick={() => handleStatus("watched", show)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="size-4 fill-white/30" />
                      Watched
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="watching"
                      onClick={() => handleStatus("watching", show)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <TvIcon className="size-4 fill-white/30" />
                      Watching
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="planning"
                      onClick={() => handleStatus("planning", show)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <ClockIcon className="size-4 fill-white/30" />
                      Planning to watch
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="dropped"
                      onClick={() => handleStatus("dropped", show)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <TrashIcon className="size-4 fill-white/30" />
                      Dropped
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="not_watched"
                      onClick={() => handleStatus("not_watched", show)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <XMarkIcon className="size-4 fill-white/30" />
                      Not Watched
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            )}
        </div>
      </div>
    );
  }
}
