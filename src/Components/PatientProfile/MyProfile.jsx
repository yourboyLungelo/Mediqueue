import React, { useState, useEffect } from 'react';
import './MyProfile.css';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    phonenumber: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load user data from localStorage or fetch from API
    const userId = localStorage.getItem('userId');
      if (userId) {
        setFormData(prev => ({ ...prev, id: userId }));
        fetch(`/api/patient/profile/${userId}`)
          .then(res => res.json())
          .then(data => {
            console.log('Fetched user data:', data);
            if (data && data.success && data.user) {
              setFormData({
                id: data.user.id || '',
                name: data.user.name || '',
                surname: data.user.surname || '',
                email: data.user.email || '',
                phonenumber: data.user.phonenumber || ''
              });
            }
          })
          .catch(err => console.error('Failed to fetch user data', err));
      }
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/patient/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        setMessage('Profile updated successfully.');
      } else {
        setMessage(result.message || 'Failed to update profile.');
      }
    } catch (error) {
      setMessage('Error updating profile.');
      console.error(error);
    }
  };

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      {message && <p className="message">{message}</p>}
      <div className="user-info-window blur-box">
        <h3>User Information</h3>
        <p><strong>ID Number:</strong> {formData.id}</p>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Surname:</strong> {formData.surname}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phonenumber}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Surname:
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default MyProfile;
