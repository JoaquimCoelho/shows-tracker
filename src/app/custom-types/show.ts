export type Show = {
  adult: boolean | true
  backdrop_path: string;
  genre_ids: number[];
  id: number | null;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number | null;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number | null;
  vote_count: number | null;
}

export type SearchShowResponse = {
  show?: {
    page: number | null;
    results: Show[];
    total_pages: number;
    total_results: number;
  };
}

export type TVShowDetails = {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export type Creator = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

export type Genre = {
  id: number | null;
  name: string;
}

export type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
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

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
}