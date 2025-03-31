import { NextResponse } from "next/server";

const apiKey = process.env.API_KEY;
const url = "https://api.themoviedb.org/3/tv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const response = await fetch(`${url}/${id}?api_key=${apiKey}&language=en-US`);
  const show = await response.json();

  return NextResponse.json(show);
}