import React, { useState } from 'react';
import axios from 'axios';

const AddStore = () => {
  const [storeData, setStoreData] = useState({ name: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    try {
      const { name, address } = storeData; // Extract name and address from storeData
      const response = await axios.post(
        'https://store-rate-app.onrender.com/api/stores/add-store',
        { name, address }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    
      alert('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Failed to add store');
    }
  };

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-user-container">
      <h2>Add Store</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Store Name" 
          onChange={handleChange} 
          value={storeData.name} 
          required 
        />
        <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          onChange={handleChange} 
          value={storeData.address} 
          required 
        />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;