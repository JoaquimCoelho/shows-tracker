import { NextResponse } from 'next/server';
export const dynamic = "force-static";


const apiKey = process.env.API_KEY || '';
const url = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&language=en-US';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const response = await fetch(`${url}&query=${query}&page=1`);
    const result = await response.json();

    return NextResponse.json(result);
}
