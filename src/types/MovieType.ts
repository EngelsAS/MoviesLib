export type MovieType = {
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
};
