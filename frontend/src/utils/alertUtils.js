let alerts = []; // This should be replaced with persistent storage (like a database)
let lastTemperature = null;

export const checkAlerts = () => {
  return alerts; // Fetch alerts logic goes here
};

export const checkThresholds = (temperature) => {
  const threshold = 35; // Example threshold for temperature
  if (lastTemperature !== null && temperature > threshold && lastTemperature > threshold) {
    alerts.push(`Alert: Temperature exceeded ${threshold}°C for consecutive updates.`);
  }
  lastTemperature = temperature; // Update the last temperature
};
