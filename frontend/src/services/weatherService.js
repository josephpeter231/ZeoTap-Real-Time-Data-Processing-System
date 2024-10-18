import axios from 'axios';

const API_KEY = 'c5f7d19fe893bb4bed278b8d1e81280b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (cities) => {
  const promises = cities.map(async (city) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    const data = response.data;
    const tempCelsius = (data.main.temp - 273.15).toFixed(2);
    const feelsLikeCelsius = (data.main.feels_like - 273.15).toFixed(2);
    const updatedAt = new Date(data.dt * 1000).toLocaleString();

    return {
      city,
      main: data.weather[0].main,
      tempCelsius,
      feelsLikeCelsius,
      updatedAt,
    };
  });

  return Promise.all(promises);
};
