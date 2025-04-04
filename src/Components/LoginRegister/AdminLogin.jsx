import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaUserShield } from "react-icons/fa";

const AdminLogin = () => {
    const [role, setRole] = useState('admin');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { 
            role,
            id, 
            password
        };

        try {
            const response = await fetch('http://localhost:3001/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            console.log(result);
            // Handle successful login (redirect, store token, etc.)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Staff Login</h1>
                    
                    <div className="input-box">
                        <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="role-select"
                        >
                            <option value="admin">Admin</option>
                            <option value="doctor">Doctor</option>
                            <option value="nurse">Nurse</option>
                        </select>
                        <FaUserShield className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Staff ID"
                            required
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>
                            Are you a patient?{' '}
                            <a href="/">Patient Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;