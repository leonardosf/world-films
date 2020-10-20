import axios from 'axios'

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

export const getImagePath = (path) => `https://image.tmdb.org/t/p/w500${path}`;
const getBackdropPath = (path) => `https://image.tmdb.org/t/p/w500${path}`;

export const ApiFilmes = axios.create({
  baseURL:'https://api.themoviedb.org/3/',
  headers: {
    'content-type':'application/json;charset=utf-8',
    'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTA1ODA1MGY1ZTI4NWJiOGRjODE0ODQ1NmYzYzkyNiIsInN1YiI6IjVmNjkyODY1NWYyZGIxMDAzNTQ0ODAyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B7BjLq8fAXKWnfSpL2TnA4pgYYbES1RoYT-4nlWTz7o'
  }
})

export const getFilmes = async (pathUrl) => {
  const retorno = await ApiFilmes.get(`${pathUrl}?language=pt-BR`);
  const movies = retorno.data.results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  )
  return movies;
}