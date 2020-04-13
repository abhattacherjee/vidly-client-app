import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >=400 && error.response.status < 500;
  logger.log(error);

  if(error.response=== 404)
    toast.error('Invalid Request');

  if(!expectedError) {
    toast.error('An unexpected error occurred.');
  }
  return Promise.reject(error);

})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};