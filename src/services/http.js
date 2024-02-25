import axios from "axios";
import { API_BASE_URL } from "../utils/constant.js";

// Define a base URL for your API
const baseURL = API_BASE_URL.LOCAL;

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL,
  timeout: 5000, // Set a timeout for requests (optional)
});

// Common HTTP methods

export const get = (url, headers = {}) => {
  return api.get(url, { headers });
};

export const post = (url, data, headers = {}) => {
  return api.post(url, data, { headers });
};

export const put = (url, data, headers = {}) => {
  return api.put(url, data, { headers });
};

export const patch = (url, data, headers = {}) => {
  return api.patch(url, data, { headers });
};

export const remove = (url, headers = {}) => {
  return api.delete(url, { headers });
};

// Usage example
// You can import these methods into your components and use them like this:
// get('/endpoint', { Authorization: 'Bearer YOUR_TOKEN' }).then(response => console.log(response.data));
