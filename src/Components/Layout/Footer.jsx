import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} MediQueue Healthcare Portal. All rights reserved.</p>
        <p>Public Hospitals South Africa</p>
      </div>
    </footer>
  );
};

export default Footer;
