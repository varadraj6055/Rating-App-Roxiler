import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setIsAdmin, setIsStoreOwner }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://store-rate-app.onrender.com/api/auth/login', { email, password });
      const { token, role } = response.data;

      // Save both the token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Update state based on role
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');
      setIsStoreOwner(role === 'store_owner');
      navigate('/');
    
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;