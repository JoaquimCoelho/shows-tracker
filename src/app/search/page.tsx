'use client';

import React, { useState } from 'react';
import { SearchResponse } from "@/app/custom-types/show";
import { ShowCard } from "@/app/components/show-card";

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
                    className="p-2 border border-purple-900 rounded-l text-white"
                />
                <button type="submit" className="bg-purple-900 text-white p-2 rounded-r hover:bg-purple-700">
                    Search
                </button>
            </form>
            <div className="flex flex-wrap justify-center">
                {results?.results.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
}
