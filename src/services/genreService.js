import httpService from "./httpService";

export function getGenres() {
  return httpService.get("/genres");
}