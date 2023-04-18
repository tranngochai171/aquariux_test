import axios from "axios";

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;

export const geoAxios = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: { "Content-Type": "application/json", "X-Api-Key": GEO_API_KEY },
});

export const weatherAxios = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: { "Content-Type": "application/json" },
});
