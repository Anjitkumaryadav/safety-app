import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    emergency1: '',
    emergency2: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      const res = await axios.post('https://safety-app-mc1t.onrender.com/api/users/register', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/ride');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="phone" placeholder="Your Phone" onChange={handleChange} /><br />
      <input name="emergency1" placeholder="Emergency Contact 1" onChange={handleChange} /><br />
      <input name="emergency2" placeholder="Emergency Contact 2" onChange={handleChange} /><br />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
