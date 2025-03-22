import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
    title: 'show tracker',
    description: 'Website to track your watched shows',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-black">
        <nav className="bg-purple-900 p-4">
            <ul className="flex justify-between items-center">
                <li>
                    <Link href="/search" className='text-white'>
                        Search
                    </Link>
                </li>
                <li>
                    <Link href="/login" className='text-white'>
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}

