import { useEffect, useState } from 'react';
import WeatherSummary from './WeatherSummary';
import { fetchWeatherData } from '../services/weatherService.js';
import Navbar from './Navbar.jsx';

const WeatherDashboard = () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData(cities);
      setWeatherData(data);
      setLoading(false);
    };
    
    fetchData(); 
    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval); 
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
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
      <h1 className="text-center mb-4 text-primary">Weather Dashboard</h1>
      <div className="row">
        {weatherData.map((data, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card shadow-lg border-0">
              <div className="card-body">
                <WeatherSummary data={data} />
              </div>
              {/* <div className="card-footer text-center">
                <button className="btn btn-info btn-sm">View Details</button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default WeatherDashboard;
