import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function getGenres() {
  return httpService.get(`${apiEndpoint}/genres`);
}