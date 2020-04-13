import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

const endpoint = `${apiEndpoint}/users`;

/**
 * Register a user
 * @param user The user object
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function registerUser(user) {
  return await httpService.post(`${endpoint}`, user);
}