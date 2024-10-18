import { useState, useEffect } from 'react';
import axios from 'axios';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const WeatherSummary = () => {
  const [weatherDataList, setWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'c5f7d19fe893bb4bed278b8d1e81280b'; // Replace with your API key

  useEffect(() => {
    const fetchWeatherDataForCities = async () => {
      setLoading(true);
      const promises = cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      );

      try {
        const responses = await Promise.all(promises);
        const weatherDataList = responses.map(response => {
          const data = response.data;
          const tempCelsius = data.main.temp - 273.15; // Convert from Kelvin to Celsius
          const feelsLikeCelsius = data.main.feels_like - 273.15; // Convert from Kelvin to Celsius
          const updatedAt = new Date(data.dt * 1000).toLocaleString(); // Convert Unix timestamp to readable date

          return {
            city: data.name,
            main: data.weather[0].main,
            tempCelsius: tempCelsius.toFixed(2),
            feelsLikeCelsius: feelsLikeCelsius.toFixed(2),
            updatedAt,
          };
        });

        setWeatherDataList(weatherDataList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherDataForCities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Weather Summary for Major Cities in India</h1>
      {weatherDataList.length > 0 ? (
        weatherDataList.map((data, index) => (
          <div key={index}>
            <h2>{data.city}</h2>
            <p>Main Condition: {data.main}</p>
            <p>Temperature: {data.tempCelsius}°C</p>
            <p>Feels Like: {data.feelsLikeCelsius}°C</p>
            <p>Data Updated At: {data.updatedAt}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WeatherSummary;
