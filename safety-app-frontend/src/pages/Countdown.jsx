import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [cancelled, setCancelled] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const ride = JSON.parse(localStorage.getItem('ride')); 
  useEffect(() => {
    if (cancelled) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          sendAlert();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cancelled]);

  const sendAlert = async () => {
    try {
      const res = await axios.post('https://safety-app-mc1t.onrender.com/api/alerts/create', {
        user,
        ride,
        location: await getLocation()
      });
      alert('Emergency alert sent!');
    } catch (err) {
      console.error('Error sending alert:', err);
    } finally {
      navigate('/');
    }
  };

  const getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => resolve({ latitude: null, longitude: null }),
        { enableHighAccuracy: true }
      );
    });
  };

  const handleCancel = () => {
    setCancelled(true);
    alert('Emergency alert cancelled.');
    navigate('/');
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>Possible Accident Detected!</h2>
      <h3>Sending alert in {timeLeft} seconds...</h3>
      <button onClick={handleCancel} style={{ padding: '10px 20px', marginTop: '20px' }}>
        I'm Safe, Cancel Alert
      </button>
    </div>
  );
};

export default Countdown;
