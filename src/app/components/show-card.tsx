import Link from "next/link";
import React from "react";
import { Show } from "@/app/custom-types/show";

type Props = {
  show: Show
}

export const ShowCard: React.FC<Props> = ({ show }) => (
  <Link className="bg-[#18181B] border border-[#004493] rounded w-44 m-2 p-1 shadow hover:scale-105 transition transform group hover:bg-[#004493]" key={show.id} href={`/show/${show.id}`}>
    <div className="mb-2">
      <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} alt={show.name} className="w-full h-56 object-cover group-hover:fill-[#99C7FB]" />
    </div>
    <h2 className="text-[#99C7FB] truncate font-semibold transition duration-200 ease-in-out group-hover:text-white">{show.name}</h2>
  </Link>
)