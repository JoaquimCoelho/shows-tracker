import Link from "next/link";
import React from "react";
import { Movie } from "@/app/custom-types/movie";

type Props = {
  movie: Movie
}

export const MovieCard: React.FC<Props> = ({ movie }) => (
  <Link className="bg-gray-900 border rounded w-44 m-2 p-2 shadow hover:scale-105 transition transform" key={movie.id} href={`/movie/${movie.id}`}>
    <div className="mb-2">
      <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} className="w-full h-56 object-cover" />
    </div>
    <h2 className="text-purple-900 truncate font-semibold">{movie.title}</h2>
  </Link>
)