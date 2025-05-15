import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [analytics, setAnalytics] = useState({ totalRegistrations: 0, activeUsers: 0 });

  const [formData, setFormData] = useState({ name: '', specialization: '', department: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);

  const apiBase = 'http://localhost:3001/api/admin';

  const fetchData = async () => {
    let url = '';
    if (activeTab === 'doctors') url = `${apiBase}/doctors`;
    else if (activeTab === 'nurses') url = `${apiBase}/nurses`;
    else if (activeTab === 'patients') url = `${apiBase}/patients`;

    if (!url) return;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (activeTab === 'doctors') setDoctors(data);
      else if (activeTab === 'nurses') setNurses(data);
      else if (activeTab === 'patients') setPatients(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAnalytics();
  }, [activeTab]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${apiBase}/analytics`);
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Analytics fetch error:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    if (activeTab === 'doctors') {
      setFormData({ name: item.name, specialization: item.specialization, email: item.email, phone: item.phone || '' });
    } else if (activeTab === 'nurses') {
      setFormData({ name: item.name, department: item.department, email: item.email, phone: item.phone || '' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const url = activeTab === 'doctors' ? `${apiBase}/doctors/${id}` : `${apiBase}/nurses/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '';
      let method = 'POST';
      let body = {};

      if (activeTab === 'doctors') {
        url = `${apiBase}/doctors${editId ? '/' + editId : ''}`;
        body = {
          name: formData.name,
          specialization: formData.specialization,
          email: formData.email,
          phone: formData.phone,
        };
      } else if (activeTab === 'nurses') {
        url = `${apiBase}/nurses${editId ? '/' + editId : ''}`;
        body = {
          name: formData.name,
          department: formData.department,
          email: formData.email,
          phone: formData.phone,
        };
      }

      if (editId) method = 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setFormData({ name: '', specialization: '', department: '', email: '', phone: '' });
        setEditId(null);
        fetchData();
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/admin-login';
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="tabs">
        <button className={activeTab === 'doctors' ? 'active' : ''} onClick={() => setActiveTab('doctors')}>
          Doctors
        </button>
        <button className={activeTab === 'nurses' ? 'active' : ''} onClick={() => setActiveTab('nurses')}>
          Nurses
        </button>
        <button className={activeTab === 'patients' ? 'active' : ''} onClick={() => setActiveTab('patients')}>
          Patients
        </button>
        <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
          Analytics
        </button>
        <button className="logout-tab-btn" onClick={handleLogout} title="Logout">
          Logout
        </button>
      </div>

      {(activeTab === 'doctors' || activeTab === 'nurses') && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editId ? 'Edit' : 'Add'} {activeTab === 'doctors' ? 'Doctor' : 'Nurse'}</h2>
          <input
            type="text"
            name="staffID"
            placeholder="Staff ID"
            value={formData.staffID || ''}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            value={formData.hospitalName || ''}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {activeTab === 'doctors' ? (
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            />
          ) : (
            <>
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ''}
                onChange={handleInputChange}
                required={!editId}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <button type="submit">{editId ? 'Update' : 'Add'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ staffID: '', hospitalName: '', name: '', specialization: '', department: '', email: '', phone: '', password: '' }); }}>Cancel</button>}
        </form>
      )}

      {(activeTab === 'doctors' || activeTab === 'nurses') && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Hospital Name</th>
              <th>Name</th>
              <th>{activeTab === 'doctors' ? 'Specialization' : 'Department'}</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'doctors' ? doctors : nurses).map((item) => (
              <tr key={item._id}>
                <td>{item.staffID}</td>
                <td>{item.hospitalName}</td>
                <td>{item.name}</td>
                <td>{activeTab === 'doctors' ? item.specialization : item.department}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}

      {activeTab === 'patients' && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.id}</td>
                <td>{patient.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics">
          <h2>Real-time Analytics</h2>
          <p>Total Registrations: {analytics.totalRegistrations}</p>
          <p>Active Users: {analytics.activeUsers}</p>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;

