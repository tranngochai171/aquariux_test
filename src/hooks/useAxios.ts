import { useEffect } from "react";

import { weatherAxios } from "../utils/axios.util";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeatherAxios = () => {
  useEffect(() => {
    const responseIntercept = weatherAxios.interceptors.request.use(
      (config: any) => {
        // Get the original URL
        const { url, params } = config;

        // Check if the URL already has query parameters
        const hasQueryParams = url?.includes("?");

        // // Append apiKey parameter with appropriate separator
        // config.params = {
        //   ...params,
        //   appid: WEATHER_API_KEY,
        // };
        config.url = `${url}${
          hasQueryParams ? "&" : "?"
        }appid=${WEATHER_API_KEY}&units=metric`;

        // Return the updated config object
        return config;
      },
      (error: any) => {
        // Handle request error
        return Promise.reject(error);
      },
    );

    return () => {
      weatherAxios.interceptors.request.eject(responseIntercept);
    };
  }, []);

  return weatherAxios;
};
