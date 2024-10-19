# Weather Monitoring Dashboard

This project is a Weather Monitoring Dashboard built with React, Chart.js, and Axios. It fetches weather data and displays it using bar and pie charts, providing insights into temperature alerts across various cities in India and gives real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates.

## Screen Recording
[Watch Demo](Screenrecording/)

## Features

- Displays maximum temperatures over the last 5 days for selected cities.
- Create alert based on user threshold limit.
- Shows temperature alerts triggered for each city in a pie chart.
- Responsive and user-friendly interface.

## Technologies

- Vite Js (React)
- Chart.js
- Axios
- CSS,Bootstrap
- Mongo DB (for datastorage)

## Installation

To set up this project locally, follow these steps:

1. **Clone the repository:**
   `git clone https://github.com/josephpeter231/ZeoTap-Real-Time-Data-Processing-System`
2. **Open two Terminals (or) split the Terminal:**
   - There are two folders `frontend` and `backend`
   - So to run locally need to run in seperate Terminals.
     - Run the following commands for frontend
       - `cd frontend`  
       - `npm install`
       - `npm run dev`

     - Run the following commands to activate backend
       - `cd backend`
       - `npm install`
       - `nodemon server` or `node server`

3. **Open your Browser Navigate to**
   - [localhost link](http://localhost:5173/)
   - make sure you run backend to get the datas from backend.

## API
1. **Homepage:** Displays current weather conditions and forecasts for various cities.
2. **DailySummary:**`/daily-summary` Provides a summary of daily weather conditions over a specified period.
3. **Alerts:**`/alerts`  Shows weather alerts for cities based on temperature thresholds conditions.
4. **Visualisation:**`/charts`  Features visual tools for analyzing weather data trends through charts and graphs.


