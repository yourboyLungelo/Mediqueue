import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FaCalendarCheck, FaFileMedical, FaPrescriptionBottleAlt, FaUserShield, FaCaretDown } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo-container">
          
          <h1>
            <div className="user-dropdown-container">
              <div
                className="user-dropdown-toggle"
                onClick={toggleDropdown}
                tabIndex={0}
                role="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {userImage ? (
                  <img src={userImage} alt="User" className="user-image" />
                ) : (
                  <span className="user-initials">{(localStorage.getItem('userName') || 'User').charAt(0).toUpperCase()}</span>
                )}
                <span className="user-name">Welcome, {localStorage.getItem('userName') || 'User'}</span>
                <FaCaretDown className="dropdown-icon" />
              </div>
              {dropdownOpen && (
                <div className="user-dropdown-menu" role="menu">
                  <label htmlFor="upload-photo" className="dropdown-item upload-photo-label" role="menuitem">
                    Upload Picture
                  </label>
                  <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <button className="dropdown-item" onClick={() => navigate('/my-profile')} role="menuitem">
                    My Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogout} role="menuitem">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </h1>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <div className="action-card" onClick={() => navigate('/appointments')} tabIndex={0} role="button" aria-label="Book Appointment">
              <FaCalendarCheck className="action-icon" />
              <h3>Book Appointment</h3>
              <p>Schedule with your preferred doctor</p>
            </div>
            <div className="action-card" onClick={() => navigate('/records')} tabIndex={0} role="button" aria-label="View Records">
              <FaFileMedical className="action-icon" />
              <h3>View Records</h3>
              <p>Access your medical history</p>
            </div>
            <div className="action-card" onClick={() => navigate('/prescriptions')} tabIndex={0} role="button" aria-label="Prescriptions">
              <FaPrescriptionBottleAlt className="action-icon" />
              <h3>Prescriptions</h3>
              <p>View and refill medications</p>
            </div>
            <div className="action-card" onClick={() => navigate('/admin-login')} tabIndex={0} role="button" aria-label="Admin Portal">
              <FaUserShield className="action-icon" />
              <h3>Admin Portal</h3>
              <p>Access administrative functions</p>
            </div>
          </div>
        </section>

        <section className="upcoming-appointments">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-list">
            <div className="appointment-item">
              <p>Dr. Smith - Cardiology</p>
              <p>Tomorrow, 10:00 AM</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
