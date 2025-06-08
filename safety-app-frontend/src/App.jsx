import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import RideSetup from './pages/RideSetup';
import SensorPage from './pages/SensorPage';
import Countdown from './pages/Countdown';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/ride" element={<RideSetup />} />
      <Route path="/monitor" element={<SensorPage />} />
      <Route path="/countdown" element={<Countdown />} />
    </Routes>
  );
}

export default App;
