import httpService from "./httpService";

const endpoint = "/movies";

function getMovieUrl (id)  {
  return `${endpoint}/${id}`;
}
export function getMovies() {
  return httpService.get(endpoint);
}

export function getMovie(id) {
  return httpService.get(getMovieUrl(id));
}

export function saveMovie(movie) {
  const body = {...movie};
  delete body._id;

  if(movie._id)
    return httpService.put(getMovieUrl(movie._id), body);
  else
    return httpService.post(endpoint, body);
}

export function deleteMovie(id) {
  return httpService.delete(getMovieUrl(id));
}