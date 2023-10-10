import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import {
  addWeatherAtom,
  SELECTED_WEATHER_STATUS,
  selectedWeatherAtom,
} from "../components/Weather";
import { geoAxios } from "../utils/axios.util";
import { formatWeatherData } from "../utils/format.util";
import { useWeatherAxios } from "./useAxios";

export const useSearchWeather = () => {
  const weatherAxios = useWeatherAxios();
  const setSelectedWeather = useSetAtom(selectedWeatherAtom);
  const addWeather = useSetAtom(addWeatherAtom);

  return useMutation({
    mutationFn: async ({
      city,
      country,
    }: {
      city: string;
      country: string;
    }) => {
      const geoResponse = await geoAxios.get(
        `/geocoding?city=${city}&country=${country}`,
      );
      const dataGeo: GeoType = geoResponse.data;
      if (dataGeo && dataGeo?.length > 0) {
        const weatherResponse = await weatherAxios.get(
          `/weather?lat=${dataGeo[0].latitude}&lon=${dataGeo[0].longitude}`,
        );
        const dataWeather: RawWeatherType = {
          ...weatherResponse.data,
          city: dataGeo[0].name,
          country: dataGeo[0].country,
        };
        const formattedDataWeather = formatWeatherData(dataWeather);
        setSelectedWeather({
          status: SELECTED_WEATHER_STATUS.RESULT,
          weather: formattedDataWeather,
        });
        addWeather(formattedDataWeather);
        return formattedDataWeather;
      }
      throw new Error("Not Found");
    },
    onError: () => {
      setSelectedWeather({
        status: SELECTED_WEATHER_STATUS.NO_RESULT,
        weather: null,
      });
    },
  });
};
