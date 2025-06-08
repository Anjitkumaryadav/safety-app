import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SensorPage = () => {
  const navigate = useNavigate();

  const [speed, setSpeed] = useState(0); // m/s
  const [acceleration, setAcceleration] = useState(0); // m/s²
  const [rotation, setRotation] = useState(0); // deg/s
  const [accident, setAccident] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const lastSpeedRef = useRef(0);
  const lastTimestampRef = useRef(null);

  const ride = JSON.parse(localStorage.getItem('ride') || '{}');
  const safeDeceleration = ride?.safeDeceleration || 15; 

  const startMonitoring = () => {
    setIsMonitoring(true);

    const motionHandler = (event) => {
      const acc = event.acceleration;

      if (acc?.x !== null && acc?.y !== null && acc?.z !== null) {
        const totalAcc = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
        setAcceleration(totalAcc);

        if (totalAcc < 0.2) return; 
        const now = event.timeStamp;
        const deltaTime = lastTimestampRef.current
          ? (now - lastTimestampRef.current) / 1000
          : 0.2;
        lastTimestampRef.current = now;

        const lastSpeed = lastSpeedRef.current;
        const newSpeed = lastSpeed + totalAcc * deltaTime;

        const clampedSpeed = Math.max(0, newSpeed);
        setSpeed(clampedSpeed);
        lastSpeedRef.current = clampedSpeed;

        const deceleration = (lastSpeed - clampedSpeed) / deltaTime;
        if (deceleration > safeDeceleration) {
          console.log('Accident by deceleration:', deceleration);
          setAccident(true);
        }
      }
    };

    const gyroHandler = (event) => {
      const rotationRate = event.rotationRate;
      if (!rotationRate) return;

      const rot =
        Math.abs(rotationRate.alpha || 0) +
        Math.abs(rotationRate.beta || 0) +
        Math.abs(rotationRate.gamma || 0);

      setRotation(rot);
      if (rot > 400) {
        console.log('Accident by rotation:', rot);
        setAccident(true);
      }
    };

    window.addEventListener('devicemotion', motionHandler);
    window.addEventListener('devicemotion', gyroHandler);

    return () => {
      window.removeEventListener('devicemotion', motionHandler);
      window.removeEventListener('devicemotion', gyroHandler);
    };
  };

  useEffect(() => {
    if (accident) {
      navigate('/countdown');
    }
  }, [accident, navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Ride Monitoring</h2>

      {!isMonitoring && (
        <button onClick={startMonitoring} style={{ padding: '10px 20px' }}>
          Start Ride
        </button>
      )}

      {isMonitoring && (
        <>
          <p>Speed: {speed.toFixed(2)} m/s</p>
          <p>Acceleration: {acceleration.toFixed(2)} m/s²</p>
          <p>Gyroscope Activity: {rotation.toFixed(2)}</p>
          <p style={{ color: 'red' }}>
            {accident ? '⚠️ Accident Detected! Redirecting...' : ''}
          </p>
        </>
      )}
    </div>
  );
};

export default SensorPage;
