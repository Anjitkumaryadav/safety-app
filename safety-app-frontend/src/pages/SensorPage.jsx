import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SensorPage = () => {
  const navigate = useNavigate();
  const [accident, setAccident] = useState(false);

  const [speed, setSpeed] = useState(0); // m/s
  const [lastSpeed, setLastSpeed] = useState(0);
  const [acceleration, setAcceleration] = useState(0); // m/s²
  const [rotation, setRotation] = useState(0); // deg/s

  useEffect(() => {
    const ride = JSON.parse(localStorage.getItem('ride'));

    // Simulated speed data via device motion
    const motionHandler = (event) => {
      const acc = event.accelerationIncludingGravity;

      if (acc?.x && acc?.y && acc?.z) {
        const totalAcc = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
        setAcceleration(totalAcc);

        const newSpeed = lastSpeed + totalAcc * 0.2; // assume 0.2s interval
        setSpeed(newSpeed);

        // Accident check: sudden deceleration
        const deceleration = (lastSpeed - newSpeed) / 0.2;
        if (deceleration > ride.safeDeceleration) {
          console.log('High deceleration detected:', deceleration);
          setAccident(true);
        }

        setLastSpeed(newSpeed);
      }
    };

    const gyroHandler = (event) => {
      const rot = Math.abs(event.rotationRate.alpha) + Math.abs(event.rotationRate.beta) + Math.abs(event.rotationRate.gamma);
      setRotation(rot);
      if (rot > 400) {
        console.log('High rotation detected');
        setAccident(true);
      }
    };

    window.addEventListener('devicemotion', motionHandler);
    window.addEventListener('deviceorientation', gyroHandler);

    return () => {
      window.removeEventListener('devicemotion', motionHandler);
      window.removeEventListener('deviceorientation', gyroHandler);
    };
  }, [lastSpeed]);

  useEffect(() => {
    if (accident) {
      navigate('/countdown');
    }
  }, [accident, navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Monitoring Ride...</h2>
      <p>Speed: {speed.toFixed(2)} m/s</p>
      <p>Acceleration: {acceleration.toFixed(2)} m/s²</p>
      <p>Gyroscope Activity: {rotation.toFixed(2)}</p>
      <p style={{ color: 'red' }}>{accident ? 'Accident Detected! Redirecting...' : ''}</p>
    </div>
  );
};

export default SensorPage;
