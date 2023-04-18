import { atom, useAtom } from "jotai";
import { useEffect } from "react";

import commonConstants from "../../constants/common.constant";
import { WeatherType } from "../../hooks/useSearch";
import HistorySection from "./HistorySection";
import SearchSection from "./SearchSection";
import WeatherResult from "./WeatherResult";
import { WeatherBox } from "./WeatherStyled";

export const SELECTED_WEATHER_STATUS = {
  PENDING: "PENDING",
  NO_RESULT: "NO_RESULT",
  RESULT: "RESULT",
};

type SelectedWeather = {
  status: string;
  weather: WeatherType | null;
};

export const selectedWeatherAtom = atom<SelectedWeather>({
  status: SELECTED_WEATHER_STATUS.PENDING,
  weather: null,
});

export const historyWeatherAtom = atom<WeatherType[]>([]);

export const sortedHistoryWeatherAtom = atom((get) =>
  get(historyWeatherAtom).sort((a, b) => b.time - a.time),
);

export const addWeatherAtom = atom(
  null,
  (get, set, newWeather: WeatherType) => {
    const listWeather = JSON.parse(JSON.stringify(get(historyWeatherAtom)));
    const index = get(historyWeatherAtom).findIndex(
      (item) => item.id === newWeather.id,
    );
    if (index !== -1) {
      listWeather[index] = newWeather;
      set(historyWeatherAtom, listWeather);
    } else {
      set(historyWeatherAtom, [...listWeather, newWeather]);
    }
  },
);

export const reselectWeatherAtom = atom(
  null,
  (_get, set, selectWeather: WeatherType) => {
    set(selectedWeatherAtom, {
      status: SELECTED_WEATHER_STATUS.RESULT,
      weather: selectWeather,
    });
  },
);

export const removeWeatherAtom = atom(
  null,
  (get, set, newWeatherId: number) => {
    const listWeather = JSON.parse(JSON.stringify(get(historyWeatherAtom)));
    const index = get(historyWeatherAtom).findIndex(
      (item) => item.id === newWeatherId,
    );
    if (index !== -1) {
      listWeather.splice(index, 1);
      set(historyWeatherAtom, listWeather);
      if (!listWeather.length) {
        localStorage.removeItem(
          commonConstants.LOCAL_STORAGE_KEY.HISTORY_WEATHER,
        );
      }
    }
  },
);

const Weather = () => {
  const [historyWeather, setHistoryWeather] = useAtom(historyWeatherAtom);
  useEffect(() => {
    if (historyWeather.length > 0) {
      localStorage.setItem(
        commonConstants.LOCAL_STORAGE_KEY.HISTORY_WEATHER,
        JSON.stringify(historyWeather),
      );
    }
  }, [historyWeather]);
  useEffect(() => {
    const historyWeather = localStorage.getItem(
      commonConstants.LOCAL_STORAGE_KEY.HISTORY_WEATHER,
    );
    if (historyWeather) {
      setHistoryWeather(JSON.parse(historyWeather));
    }
  }, []);
  return (
    <WeatherBox>
      <SearchSection />
      <WeatherResult />
      <HistorySection />
    </WeatherBox>
  );
};

export default Weather;
