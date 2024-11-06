// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await registerUser({ email: formData.email, password: formData.password, role: 'viewer' });
            navigate('/viewer-dashboard');
        } catch (error) {
            console.error("Registration failed", error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                    className="signup-input"
                />
                <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                    className="signup-input"
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    onChange={handleChange} 
                    placeholder="Confirm Password" 
                    required 
                    className="signup-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
        </div>
    );
};

export default Signup;
