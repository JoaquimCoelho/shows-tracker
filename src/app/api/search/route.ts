import { NextResponse } from 'next/server';

const apiKey = process.env.API_KEY || '';
const url_shows = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&language=en-US';
const url_movies = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get('q');
	
	//Inicializer
	const [showResponse, movieResponse] = await Promise.all([
		fetch(`${url_shows}&query=${query}&page=1`),
		fetch(`${url_movies}&query=${query}&page=1`)
	]);

	//Response
	const [showResults, movieResults] = await Promise.all([
		showResponse.json(),
		movieResponse.json()
	]);

	//Return
	return NextResponse.json({
		show: showResults,
		movie: movieResults
	});
}