import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >=400 && error.response.status < 500;
  logger.log(error);

  if(error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403))
    toast.error("Unauthorized");

  if(error.response === 404)
    toast.error('Invalid Request');

  if(!expectedError) {
    toast.error('An unexpected error occurred.');
  }
  return Promise.reject(error);

})

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};