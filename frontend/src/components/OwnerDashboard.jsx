import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRatings: 0,
    userRatingsList: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://store-rate-app.onrender.com/api/owner/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="owner-dashboard-container">
      <h2>Owner Dashboard</h2>
      <p>Total Ratings Submitted: {dashboardData.totalRatings}</p>
      <h3>Users Who Rated Your Stores:</h3>
      {dashboardData.userRatingsList.length > 0 ? (
        <table className="table table-striped table-bordered darkTable">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Store Name</th>
              <th>Rating</th>
              <th>average Rating</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.userRatingsList.map((rating, index) => (
              <tr key={index}>
                <td>{rating.userName}</td>
                <td>{rating.userEmail}</td>
                <td>{rating.storeName}</td>
                <td>{rating.rating}</td>
                <td>{rating.averageRating}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users have rated your stores yet.</p>
      )}
    </div>
  );
};

export default OwnerDashboard;