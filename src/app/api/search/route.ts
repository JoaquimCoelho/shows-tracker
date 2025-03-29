import { NextResponse } from 'next/server';

const apiKey = process.env.API_KEY || '';
const url_tvshows = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&language=en-US';
const url_movies = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get('q');
	
	//Inicializer
	const [tvResponse, movieResponse] = await Promise.all([
		fetch(`${url_tvshows}&query=${query}&page=1`),
		fetch(`${url_movies}&query=${query}&page=1`)
	]);

	//Response
	const [tvResults, movieResults] = await Promise.all([
		tvResponse.json(),
		movieResponse.json()
	]);

	//Return
	return NextResponse.json({
		tv: tvResults,
		movies: movieResults
	});
}