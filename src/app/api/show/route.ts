import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;
const url_tvshows = "https://api.themoviedb.org/3/tv";
const url_movies = "https://api.themoviedb.org/3/movie";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	// Inicializer
	const [tvResponse, movieResponse] = await Promise.all([
		fetch(`${url_tvshows}/${id}?api_key=${apiKey}&language=en-US`),
		fetch(`${url_movies}/${id}?api_key=${apiKey}&language=en-US`)
	]);

	// Response
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