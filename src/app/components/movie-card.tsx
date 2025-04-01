import Link from "next/link";
import React from "react";
import { Movie } from "@/app/custom-types/movie";

type Props = {
  movie: Movie
}

export const MovieCard: React.FC<Props> = ({ movie }) => (
  <Link className="bg-[#18181B] border border-[#920B3A] rounded w-44 m-2 p-2 shadow hover:scale-105 transition transform  group hover:bg-[#920B3A]" key={movie.id} href={`/movie/${movie.id}`}>
    <div className="mb-2">
      <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} className="w-full h-56 object-cover group-hover:fill-[#FAA0BF]" />
    </div>
    <h2 className="text-[#FAA0BF] truncate font-semibold transition duration-200 group-hover:text-white">{movie.title}</h2>
  </Link>
)