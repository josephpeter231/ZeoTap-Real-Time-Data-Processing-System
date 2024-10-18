import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './WeatherSummary.css'; 
import Navbar from './Navbar';

const cities = [
  { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
  { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
  { name: 'Hyderabad', latitude: 17.385, longitude: 78.4867 },
];

const WeatherSummary = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(null);
  const [thresholdInput, setThresholdInput] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      
      const today = new Date().toISOString().split('T')[0];
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const startDate = fiveDaysAgo.toISOString().split('T')[0];

      let allWeatherData = {};

      try {
        for (let city of cities) {
          const response = await axios.get(
            `https://archive-api.open-meteo.com/v1/era5?latitude=${city.latitude}&longitude=${city.longitude}&start_date=${startDate}&end_date=${today}&hourly=temperature_2m`
          );

          const { time, temperature_2m } = response.data.hourly;
          const dailyData = {};
          time.forEach((t, i) => {
            const date = t.split('T')[0];
            if (!dailyData[date]) {
              dailyData[date] = [];
            }
            dailyData[date].push(temperature_2m[i]);
          });

          const dailySummary = Object.keys(dailyData).map((date) => {
            const temperatures = dailyData[date];
            const maxTemp = Math.max(...temperatures);
            const minTemp = Math.min(...temperatures);
            const avgTemp =
              temperatures.reduce((acc, temp) => acc + temp, 0) /
              temperatures.length;

            return {
              date,
              average: avgTemp.toFixed(2),
              maximum: maxTemp.toFixed(2),
              minimum: minTemp.toFixed(2),
            };
          });

          allWeatherData[city.name] = dailySummary;
        }

        setWeatherData(allWeatherData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        console.log(threshold)
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleThresholdChange = (e) => {
    setThresholdInput(e.target.value);
  };

  const updateThreshold = () => {
    const value = parseFloat(thresholdInput);
    if (!isNaN(value) && value > 0) {
      setThreshold(value);
      setThresholdInput('');

      checkForAlerts(value);
    } else {
      Swal.fire({
        title: 'Invalid Threshold',
        text: 'Please enter a valid positive number.',
        icon: 'error',
      });
    }
  };

  const checkForAlerts = (threshold) => {
    for (const cityName in weatherData) {
      const dailySummary = weatherData[cityName];

      dailySummary.forEach((day) => {
        if (parseFloat(day.maximum) >= threshold) {
          Swal.fire({
            title: `Temperature Alert!`,
            text: `Threshold temperature  exceeded ${threshold}°C.`,
            icon: 'warning',
          });

          axios.post('http://localhost:5000/api/alerts', {
            city: cityName,
            date: day.date,
            threshold,
          })
          .then(() => {
            console.log('Alert data sent to the backend');
          })
          .catch((error) => {
            console.error('Error sending alert data to backend:', error);
          });
          setTimeout(() => {
            window.location.href = '/alerts';
          }, 8000);
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather Summary for the Past 5 Days</h1>
      <div className="mb-4 threshold-section">
        <label htmlFor="thresholdInput" className="form-label">Set Temperature Threshold (°C):</label>
        <div className="input-group">
          <input
            id="thresholdInput"
            type="number"
            className="form-control"
            value={thresholdInput}
            onChange={handleThresholdChange}
            placeholder="Enter threshold"
          />
          <button onClick={updateThreshold} className="btn btn-primary">Set Threshold</button>
        </div>
      </div>
      {Object.keys(weatherData).map((cityName) => (
        <div key={cityName} className="mb-4 city-section">
          <h2 className="city-name">{cityName}</h2>
          <div className="row">
            {weatherData[cityName].map((day, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card weather-card shadow-sm border-light">
                  <div className="card-body">
                    <h5 className="card-title date-highlight">Date: {day.date}</h5>
                    <p className="card-text"><strong>Average Temperature:</strong> {day.average}°C</p>
                    <p className="card-text"><strong>Maximum Temperature:</strong> {day.maximum}°C</p>
                    <p className="card-text"><strong>Minimum Temperature:</strong> {day.minimum}°C</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default WeatherSummary;
