let alerts = []; 
let lastTemperature = null;

export const checkAlerts = () => {
  return alerts; 
};

export const checkThresholds = (temperature) => {
  const threshold = 35; 
  if (lastTemperature !== null && temperature > threshold && lastTemperature > threshold) {
    alerts.push(`Alert: Temperature exceeded ${threshold}°C for consecutive updates.`);
  }
  lastTemperature = temperature; 
};
