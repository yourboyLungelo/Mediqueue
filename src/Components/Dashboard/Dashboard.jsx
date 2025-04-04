import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session/token here if needed
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>MediQueue Healthcare Portal</h1>
        <div className="user-info">
          <span>Welcome, {localStorage.getItem('userName') || 'User'}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <div className="action-card" onClick={() => navigate('/appointments')}>
              <h3>Book Appointment</h3>
              <p>Schedule with your preferred doctor</p>
            </div>
            <div className="action-card" onClick={() => navigate('/records')}>
              <h3>View Records</h3>
              <p>Access your medical history</p>
            </div>
            <div className="action-card" onClick={() => navigate('/prescriptions')}>
              <h3>Prescriptions</h3>
              <p>View and refill medications</p>
            </div>
            <div className="action-card" onClick={() => navigate('/admin-login')}>
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
