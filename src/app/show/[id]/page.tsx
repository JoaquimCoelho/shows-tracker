'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ShowDetails {
    id: number | string;
    title: string;
    description: string;
    poster: string;
}

export default function ShowPage() {
    const { id } = useParams() as { id: string };
    const [show, setShow] = useState<ShowDetails | null>(null);

    useEffect(() => {
        const fetchShow = async () => {
            const res = await fetch(`/api/show/${id}`);
            const data = await res.json();
            setShow(data);
        };
        fetchShow();
    }, [id]);

    if (!show) return <div className="text-center text-purple-900">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow flex">
            <div className="w-1/3">
                <img src={show.poster} alt={show.title} className="w-full h-auto object-cover" />
            </div>
            <div className="w-2/3 pl-6">
                <h1 className="text-3xl text-purple-900 mb-4">{show.title}</h1>
                <p className="text-purple-800">{show.description}</p>
            </div>
        </div>
    );
}
