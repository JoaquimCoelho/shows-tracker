'use client';

import React, { useState } from 'react';
import { SearchShowResponse } from "@/app/custom-types/show";
import { SearchMovieResponse } from "@/app/custom-types/movie";
import { ShowCard } from "@/app/components/show-card";
import { MovieCard } from "@/app/components/movie-card";

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results_show, setResults_show] = useState<SearchShowResponse>();
    const [results_movie, setResults_movie] = useState<SearchMovieResponse>();
    const [filter, setFilter] = useState<'all' | 'shows' | 'movies'>('all');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults_show(data);
        setResults_movie(data);
    };


    return (
        <div className="text-center">
            <form onSubmit={handleSearch} className="flex justify-center m-8">
                <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}
                    className="p-2 text-center border border-purple-900 rounded text-white"
                />
            </form>

            <div className="flex justify-center gap-4 mb-4">
                <button onClick={() => setFilter('all')} className="px-4 py-2 bg-gray-700 text-white rounded">
                    Show All
                </button>
                <button onClick={() => setFilter('shows')} className="px-4 py-2 bg-purple-700 text-white rounded">
                    TV Shows
                </button>
                <button onClick={() => setFilter('movies')} className="px-4 py-2 bg-blue-700 text-white rounded">
                    Movies
                </button>
            </div>

            <div className="flex flex-wrap justify-center">
                {(filter === 'all' || filter === 'shows') &&
                    results_show?.show?.results.map((show) => <ShowCard key={show.id} show={show}/>)}
                {(filter === 'all' || filter === 'movies') &&
                    results_movie?.movie?.results.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
}
