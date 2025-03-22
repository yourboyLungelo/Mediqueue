import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser,FaLock ,FaPhone ,FaEnvelope } from "react-icons/fa";



const LoginRegister = () => {

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
    <div className = {`wrapper${action}`}>
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" 
                        placeholder = 'ID Number' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="Password" 
                        placeholder = 'Password' required />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /
                        >Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

        
                
            <div className="form-box register">
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" 
                        placeholder = 'ID Number' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="text" 
                        placeholder = 'Name' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="text" 
                        placeholder = 'Surname' required />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="email" 
                        placeholder = 'Email'  />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="tel" 
                        placeholder = 'Phone Number' required  />
                        <FaPhone className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="Password" 
                        placeholder = 'Password' required />
                        <FaLock className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="Password" 
                        placeholder = 'Confirm Password' required />
                        <FaLock className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /
                        >I agree to the terms & conditions</label>
                        
                    </div>
                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>

            </div>
        
        </div>
    );
};

export default LoginRegister;