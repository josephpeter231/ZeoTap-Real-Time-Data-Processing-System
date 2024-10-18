import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import DailySummary from './components/DailySummary';
import Alerts from './components/Alerts';
import Analysis from './components/VisualEffect'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/daily-summary" element={<DailySummary />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/charts" element={<Analysis />} />

      </Routes>
    </Router>
  );
};

export default App;
