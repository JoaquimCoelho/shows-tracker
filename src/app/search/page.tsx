'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Show {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

interface SearchResponse {
    page: number;
    results: Show[];
    total_pages: number;
    total_results: number;
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResponse>();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl mb-4 text-purple-900">Search TV Shows</h2>
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border border-purple-900 rounded-l"
                />
                <button type="submit" className="bg-purple-900 text-white p-2 rounded-r hover:bg-purple-700">
                    Search
                </button>
            </form>
            <div className="flex flex-wrap justify-center">
                {results?.results.map((show) => (
                    <Link className="w-44 m-2 p-2 bg-white shadow hover:scale-105 transition transform" key={show.id} href={`/show/${show.id}`}>
                            <div className="mb-2">
                                <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} alt={show.name} className="w-full h-48 object-cover" />
                            </div>
                            <h2 className="text-purple-900 truncate">{show.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
