import ky from "ky";

const API_URL = "http://localhost:3001/";

export const apiClient = ky.extend({
  prefixUrl: API_URL,
  timeout: 10000,
});
