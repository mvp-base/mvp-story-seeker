export interface IBookRecommendation {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  author: string;
  ISBN: string;
  pageCount: string;
}

export interface IMovieRecommendation {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  director: string;
  boxOffice: string;
  runtime: string;
}

export interface IRecommendations {
  books: Array<IBookRecommendation>;
  movies: Array<IMovieRecommendation>;
}

export interface IApiResponse {
  suggestions: IRecommendations;
}
