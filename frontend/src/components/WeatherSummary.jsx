import React from 'react';

const WeatherSummary = ({ data }) => {
  return (
    <div>
      <h2>{data.city}</h2>
      <p>Main Condition: {data.main}</p>
      <p>Temperature: {data.tempCelsius}°C</p>
      <p>Feels Like: {data.feelsLikeCelsius}°C</p>
      <p>Data Updated At: {data.updatedAt}</p>
    </div>
  );
};

export default WeatherSummary;
