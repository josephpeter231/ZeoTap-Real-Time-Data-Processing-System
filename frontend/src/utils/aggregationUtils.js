let dailySummaries = []; // This should be replaced with persistent storage (like a database)

// Function to roll up daily summaries
export const rollUpDailySummary = (newData) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date
  const existingSummary = dailySummaries.find(summary => summary.date === today);

  if (existingSummary) {
    existingSummary.avgTemp = (existingSummary.avgTemp + newData.tempCelsius) / 2;
    existingSummary.maxTemp = Math.max(existingSummary.maxTemp, newData.tempCelsius);
    existingSummary.minTemp = Math.min(existingSummary.minTemp, newData.tempCelsius);
  } else {
    dailySummaries.push({
      date: today,
      avgTemp: newData.tempCelsius,
      maxTemp: newData.tempCelsius,
      minTemp: newData.tempCelsius,
      dominantCondition: newData.main, // Simplified logic for demo
    });
  }
};

export const getDailySummary = () => {
  return dailySummaries;
};
