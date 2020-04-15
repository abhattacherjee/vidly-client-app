import httpService from "./httpService";

const endpoint = "/users";

/**
 * Register a user
 * @param user The user object
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function registerUser(user) {
  return await httpService.post(`${endpoint}`, user);
}