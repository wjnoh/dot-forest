import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export function fetchGET({ url, jwtToken }) {
  if (!jwtToken) {
    return axios.get(BASE_URL + url);
  }

  return axios.get(BASE_URL + url, {
    headers: {
      'Authorization': jwtToken,
    },
  });
}

export function fetchPOST({ url, data, jwtToken }) {
  if (!jwtToken) {
    return axios.post(BASE_URL + url, data);
  }

  return axios.post(BASE_URL + url, data, {
    headers: {
      'Authorization': jwtToken,
    },
  });
}