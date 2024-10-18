import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import moment from 'moment'; // Add this library to format date-time
import './Alerts.css'; // Import CSS

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(alerts)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alerts');
        // Sort alerts by createdAt date in descending order
        const sortedAlerts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAlerts(sortedAlerts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Error fetching alerts');
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // Function to determine card background based on threshold
  const getCardBackground = (threshold) => {
    if (threshold >= 30) return 'card-high';
    if (threshold >= 25) return 'card-medium';
    return 'card-low';
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Weather Alerts</h1>
          {alerts.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              No alerts to display
            </div>
          ) : (
            <div className="alert-container">
              {alerts.map((alert, index) => (
                <div key={index} className={`card shadow-sm mb-3 ${getCardBackground(alert.threshold)}`}>
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>City:</strong> {alert.city}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Date:</strong> {alert.date}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Threshold:</strong> {alert.threshold}°C
                    </p>
                    <p className="card-text mb-1">
                      <strong>Alert Created:</strong>{' '}
                      {moment(alert.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alerts;
