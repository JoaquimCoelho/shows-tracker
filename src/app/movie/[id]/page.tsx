"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MovieDetails } from "@/app/custom-types/movie";
import { useUser } from "@stackframe/stack";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/16/solid";

export default function MoviePage() {
  const { id } = useParams() as { id: string };
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const allStatuses = ["watched", "planning"];
  const user = useUser();
  let bool: boolean = true;
  allStatuses.map((statusName) =>
    user?.clientMetadata?.[statusName]?.includes(movie?.id)
      ? (bool = false)
      : null,
  );

  useEffect(() => {
    const fetchShow = async () => {
      const res = await fetch(`/api/movie?id=${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchShow();
  }, [id]);

  const currentClientMetadata = user?.clientMetadata || {};

  const handleStatus = async (status: string, movie: MovieDetails) => {
    const currentStatusData = currentClientMetadata[status] || [];
    const updatedMetadata = allStatuses.reduce((acc, currStatus: string) => {
      if (currStatus !== status) {
        // @ts-expect-error its 1 am n quero dar fix
        acc[currStatus] = (currentClientMetadata[currStatus] || []).filter(
          (id: number) => id !== movie.id,
        );
      } else {
        // @ts-expect-error its 1 am n quero dar fix
        acc[currStatus] = [...currentStatusData, movie.id];
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

  if (!movie){
    return <div className="text-center text-purple-900">Loading...</div>;
  }else{
    return (
      <div className="flex mx-auto bg-gray-900 p-6 rounded shadow">
        <div className="w-1/3">
          <img
            src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-2/3 pl-6">
          <h1 className="text-3xl mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>
          <p className="mb-4">Rating: {movie.vote_average}</p>
          {user && (
            <div className="w-52">
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md border-1 border-white py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                  {allStatuses.map((statusName) =>
                    user.clientMetadata?.[statusName]?.includes(movie.id) ? (
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
                      onClick={() => handleStatus("watched", movie)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="size-4 fill-white/30" />
                      Watched
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="planning"
                      onClick={() => handleStatus("planning", movie)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                      <ClockIcon className="size-4 fill-white/30" />
                      Planning to watch
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      name="not_watched"
                      onClick={() => handleStatus("not_watched", movie)}
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
