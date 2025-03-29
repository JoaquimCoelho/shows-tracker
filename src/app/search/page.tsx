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
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 text-center border border-purple-900 rounded text-white"
                />
            </form>
            <div className="flex flex-wrap justify-center">
                {results?.results?.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
}
