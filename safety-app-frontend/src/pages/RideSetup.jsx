import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RideSetup = () => {
  const [vehicle, setVehicle] = useState('car');
  const navigate = useNavigate();

  const startRide = () => {
    const ride = {
      vehicle,
      mass: getMass(vehicle), // in kg
      safeDeceleration: getSafeDeceleration(vehicle),
    };

    localStorage.setItem('ride', JSON.stringify(ride));
    navigate('/monitor');
  };

  const getMass = (v) => {
    switch (v) {
      case 'bike': return 150;
      case 'car': return 1200;
      case 'bus': return 5000;
      default: return 1200;
    }
  };

  const getSafeDeceleration = (v) => {
    switch (v) {
      case 'bike': return 12; // m/s²
      case 'car': return 8;
      case 'bus': return 5;
      default: return 8;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Vehicle</h2>
      <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
        <option value="bike">Bike</option>
        <option value="car">Car</option>
        <option value="bus">Bus</option>
      </select>
      <br /><br />
      <button onClick={startRide}>Start Ride</button>
    </div>
  );
};

export default RideSetup;
