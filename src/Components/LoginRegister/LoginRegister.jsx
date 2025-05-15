import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('active');
    };
    

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    

    const [message, setMessage] = useState({ text: '', isError: false });
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', isError: false });

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    surname,
                    email, 
                    phonenumber
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage({ text: 'Registration successful! You can now login', isError: false });
            } else {
                setMessage({ text: result.error || 'Registration failed', isError: true });
            }
        } catch (error) {
            setMessage({ text: 'Network error. Please try again.', isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', isError: false });

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userName', result.user.name);
                localStorage.setItem('userId', result.user.id);
                navigate('/dashboard');
            } else {
                setMessage({ text: result.error || 'Invalid credentials', isError: true });
            }
        } catch (error) {
            setMessage({ text: 'Network error. Please try again.', isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="ID Number"
                            required
                            onChange={(e) => setId(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    
                    
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        
                    </div>
                    {message.text && (
                        <div className={`message ${message.isError ? 'error' : 'success'}`}>
                            {message.text}
                        </div>
                    )}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Login'}
                    </button>

                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                        <a href="#" className="link" onClick={registerLink}>Register</a>
                        </p>
                        <p>
                            Doctor, Nurse and Admin{' '}
                        <a href="/admin-login" className="link">Login</a>
                        </p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="ID Number"
                            required
                            onChange={(e) => setId(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Surname"
                            required
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                        <FaPhone className="icon" />
                    </div>
                    

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            I agree to the terms & conditions
                        </label>
                    </div>
                    {message.text && (
                        <div className={`message ${message.isError ? 'error' : 'success'}`}>
                            {message.text}
                        </div>
                    )}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Register'}
                    </button>

                    <div className="register-link">
                        <p>
                            Already have an account?{' '}
                        <a href="/" className="link" onClick={loginLink}>Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
