import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <img src="/logo192.png" alt="Hospital Logo" className="header-logo" />
        <h1 className="header-title">MediQueue Healthcare Portal</h1>
        <nav className="header-nav">
          <a href="/dashboard" className="nav-link">Home</a>
          <a href="/appointments" className="nav-link">Appointments</a>
          <a href="/records" className="nav-link">Records</a>
          <a href="/prescriptions" className="nav-link">Prescriptions</a>
          <a href="/admin-login" className="nav-link">Admin</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
