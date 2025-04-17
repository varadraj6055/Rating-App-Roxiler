import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddStore from './components/AddStore';
import AddUser from './components/AddUser';
import AdminDashboard from './components/AdminDashboard';
import StoreList from './components/StoreList';
import OwnerDashboard from './components/OwnerDashboard';

import ChangePassword from './components/ChangePassword';
import UserList from './components/Userlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; // For DataTables Bootstrap integration

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStoreOwner, setIsStoreOwner] = useState(false); // New state for store owner

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');
      setIsStoreOwner(role === 'store_owner'); // Set store_owner role
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsStoreOwner(false); // Clear store owner state
    window.location.href = '/';
  };

  return (
    <Router>
      <NavBar isAdmin={isAdmin} isLoggedIn={isLoggedIn} isStoreOwner={isStoreOwner} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setIsStoreOwner={setIsStoreOwner} />} />
        <Route path="/signup" element={<Signup />} />
        
        {isLoggedIn && isAdmin && (
          <>
            <Route path="/add-store" element={<AddStore />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<UserList />} />
          </>
        )}
        {isLoggedIn && isStoreOwner && (
          <>
            <Route path="/add-store" element={<AddStore />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/dashboard" element={<OwnerDashboard />} />

          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/stores" element={<StoreList />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;