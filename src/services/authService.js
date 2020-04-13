import httpService from "./httpService";
import { apiEndpoint } from "../config.json";
import jwtDecode from "jwt-decode";

const endpoint = `${apiEndpoint}/auth`;
const tokenKey = "token";

httpService.setJwt(getUserJwt());

export async function login(email, password) {
  const {data: jwt } = await httpService.post(endpoint, {email, password});
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export function getUserJwt() {
  return localStorage.getItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}