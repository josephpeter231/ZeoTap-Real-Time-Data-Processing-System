import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import './ChartComponent.css'; 
import Navbar from './Navbar';

const cities = [
  { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
  { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639 },
  { name: 'Hyderabad', latitude: 17.385, longitude: 78.4867 },
];

const ChartComponent = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [alertData, setAlertData] = useState([]);
  const [maxTempData, setMaxTempData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const startDate = fiveDaysAgo.toISOString().split('T')[0];

      let alerts = [];
      let cityTemperatures = [];

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

        
          const dailyMaxTemps = Object.keys(dailyData).map((date) => {
            const maxTemp = Math.max(...dailyData[date]);

            
            if (maxTemp >= 30) {
              alerts.push(city.name);
            }
            return maxTemp.toFixed(2);
          });

          cityTemperatures.push({
            city: city.name,
            temperatures: dailyMaxTemps,
          });
        }

        setMaxTempData(cityTemperatures);
        setAlertData(alerts);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const cityLabels = maxTempData.map((data) => data.city);
    const temperatureDatasets = maxTempData.map((data) => ({
      label: `${data.city} Max Temp`,
      data: data.temperatures,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
    }));

    if (barChartRef.current) {
      const barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
          datasets: temperatureDatasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Max Temperature (°C)',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Max Temperatures Over the Last 5 Days',
            },
            legend: {
              position: 'bottom', 
            },
          },
        },
      });

      return () => {
        barChart.destroy();
      };
    }
  }, [maxTempData]);

  useEffect(() => {
    const cityAlertCount = alertData.reduce((acc, city) => {
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const pieChartLabels = Object.keys(cityAlertCount);
    const pieChartData = Object.values(cityAlertCount);

    if (pieChartRef.current) {
      const pieChart = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels: pieChartLabels,
          datasets: [
            {
              label: 'Temperature Alerts',
              data: pieChartData,
              backgroundColor: pieChartLabels.map(
                () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`
              ),
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Temperature Alerts by City',
            },
            legend: {
              position: 'bottom', 
            },
          },
        },
      });

      return () => {
        pieChart.destroy();
      };
    }
  }, [alertData]);

  return (
    <>
    <Navbar />
    <div className="chart-container">
      <div className="chart-wrapper">
        <h2>Bar Chart (Max Temperatures)</h2>
        <canvas ref={barChartRef}></canvas>
      </div>
      <div className="chart-wrapper2">
        <h2>Triggered Alerts</h2>
        <canvas ref={pieChartRef}></canvas>
      </div>
    </div>
    </>
  );
};

export default ChartComponent;
