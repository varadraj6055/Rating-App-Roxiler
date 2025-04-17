// frontend/src/components/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://store-rate-app.onrender.com/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Dashboard data:', response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard-container" >
      <h2>Admin Dashboard</h2>
      <p>Total Users: {dashboardData.totalUsers}</p>
      <p>Total Stores: {dashboardData.totalStores}</p>
      <p>Total Ratings Submitted: {dashboardData.totalRatings}</p>
    </div>
  );
};
export default AdminDashboard;