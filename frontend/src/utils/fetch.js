import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export function fetchGET({ url }) {
  return axios.get(BASE_URL + url);
}

export function fetchPOST({ url, data }) {
  return axios.post(BASE_URL + url, data);
}