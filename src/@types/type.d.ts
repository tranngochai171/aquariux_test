type ValueOf<T> = T[keyof T];

type GeoType = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}[];

type RawWeatherType = {
  city: string;
  country: string;
  main: {
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  id: number;
};

type WeatherType = {
  id: number;
  city: string;
  country: string;
  weather: string;
  description: string;
  icon: string;
  humidity: number;
  temp_min: number;
  temp_max: number;
  time: number;
};

type WeathersType = WeatherType[];
