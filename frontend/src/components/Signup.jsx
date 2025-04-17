

import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ isAdmin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // Default role is user for normal signup
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://store-rate-app.onrender.com/api/auth/signup', formData);
      alert('Signup successful');
      navigate('/login'); // Redirect to login after signup
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed toSignUp. Please try again. You may be missing one of the following requirements:\n\n' +
        '● The name length should be between 20 and 60 characters.\n' +
        '● The address length should be 400 characters max.\n' +
        '● The password length should be between 8 and 16 characters, and it must contain at least 1 uppercase letter and 1 special character.\n' +
        '● Avoid duplicate entries.\n' +
        '● The email address must be valid.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-user-container">
      <h2>{isAdmin ? 'Add User' : 'Signup'}</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store_owner</option>
          </select>
      
        <button type="submit">{isAdmin ? 'Add User' : 'Signup'}</button>
      </form>
    </div>
  );
};
export default Signup;