export type Movie = {
  adult: boolean | true
  backdrop_path: string;
  genre_ids: number[];
  id: number | null;
  origin_language: string;
  original_title: string;
  overview: string;
  popularity: number | null;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean | true;
  vote_average: number | null;
  vote_count: number | null;
}

export type SearchMovieResponse = {
  movie? : {
    page: number | null;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

export type MovieDetails = {
    adult: boolean | true;
    backdrop_path: string;
    belongs_to_collection: string;
    budget: number | null;
    genres: Genre[];
    homepage: string;
    id: number | null;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number | null;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number | null;
    runtime: number | null;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean | true;
    vote_average: number | null;
    vote_count: number | null;
};

export type Genre = {
    id: number | null;
    name: string;
}

export type ProductionCompany = {
    id: number | null;
    logo_path: string;
    name: string;
    origin_country: string;
}

export type ProductionCountry = {
    iso_3166_1: string;
    name: string;
}

export type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
}