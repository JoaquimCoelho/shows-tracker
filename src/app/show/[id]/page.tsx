'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {TVShowDetails} from "@/app/costum-types/show";

export default function ShowPage() {
    const { id } = useParams() as { id: string };
    const [show, setShow] = useState<TVShowDetails | null>(null);

    useEffect(() => {
        const fetchShow = async () => {
            const res = await fetch(`/api/show?id=${id}`);
            const data = await res.json();
            setShow(data);
        };
        fetchShow().then(r => console.log(r));
    }, [id]);

    if (!show) return <div className="text-center text-purple-900">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow flex">
            <div className="w-1/3">
                <img src={'https://image.tmdb.org/t/p/w500/' + show.poster_path} alt={show.name} className="w-full h-auto object-cover" />
            </div>
            <div className="w-2/3 pl-6">
                <h1 className="text-3xl text-purple-900 mb-4">{show.name}</h1>
                <p className="text-purple-800">{show.overview}</p>
            </div>
        </div>
    );
}
