import Link from "next/link";
import React from "react";
import { Show } from "@/app/costum-types/show";

type Props = {
  show: Show
}

export const ShowCard: React.FC<Props> = ({ show }) => (
  <Link className="bg-gray-900 border rounded w-44 m-2 p-2 shadow hover:scale-105 transition transform" key={show.id} href={`/show/${show.id}`}>
    <div className="mb-2">
      <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} alt={show.name} className="w-full h-56 object-cover" />
    </div>
    <h2 className="text-purple-900 truncate font-semibold">{show.name}</h2>
  </Link>
  )