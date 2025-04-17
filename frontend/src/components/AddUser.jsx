
import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user', // Default to normal user
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://store-rate-app.onrender.com/api/admin/adduser', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
      alert('Failed to add user. Please try again. You may be missing one of the following requirements:\n\n' +
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
  <h2>Add User</h2>
  <form onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
    <select name="role" onChange={handleChange} value={formData.role}>
      <option value="user">User</option>
      <option value="admin">Admin</option>
      <option value="store_owner">Store_owner</option>
    </select>
    <button type="submit">Add User</button>
  </form>
</div>
  );
};
export default AddUser;