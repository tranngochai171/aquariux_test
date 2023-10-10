export const formatWeatherData = (rawData: RawWeatherType): WeatherType => {
  return {
    id: rawData.id,
    city: rawData.city,
    country: rawData.country,
    weather: rawData.weather[0].main,
    description: rawData.weather[0].description,
    icon: `http://openweathermap.org/img/w/${rawData.weather[0].icon}.png`,
    humidity: rawData.main.humidity,
    temp_min: rawData.main.temp_min,
    temp_max: rawData.main.temp_max,
    time: new Date().getTime(),
  };
};
