import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const NavBar = ({ isAdmin, isLoggedIn, handleLogout, isStoreOwner }) => {
  return (
    <nav className="navbar">
      <ul>
        {!isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {isLoggedIn && (
          <>
            {/* Admin Routes */}
            {isAdmin && (
              <>
                <li><Link to="/add-store">Add Store</Link></li>
                <li><Link to="/add-user">Add User</Link></li>
                <li><Link to="/admin-dashboard">Dashboard</Link></li>
                <li><Link to="/stores">View Stores</Link></li>
                <li><Link to="/users">View Users</Link></li>
                <li><Link to="/change-password">Change Password</Link></li>
              </>
            )}

            {/* Store Owner Routes */}
            {isStoreOwner && (
              <>
                <li><Link to="/add-store">Add Store</Link></li>
                <li><Link to="/stores">View Stores</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/change-password">Change Password</Link></li>
              </>
            )}

            {/* Normal User Routes */}
            {!isAdmin && !isStoreOwner && (
              <>
                <li><Link to="/stores">View Stores</Link></li>
                <li><Link to="/change-password">Change Password</Link></li>
                
              </>
            )}

            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;