import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // must contain { name, email }

      toast.success('🔓 Login Successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('❌ Invalid Credentials');
    }
  };

  return (
    <div className="container mt-4">
      <h3>🔐 Login</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <input type="email" name="email" placeholder="Email" className="form-control mb-3" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control mb-3" onChange={handleChange} required />
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
