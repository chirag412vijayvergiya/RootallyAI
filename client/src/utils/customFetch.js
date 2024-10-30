import axios from "axios";
const customFetch = axios.create({
  baseURL: `http://localhost:8000/api/v1`,
  withCredentials: true,
});
customFetch.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error);
    return Promise.reject(error);
  }
);

export default customFetch;
