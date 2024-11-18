import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

const Signup = ({ onClose }) => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.+\.life|.+\.lk)$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^[A-Z][a-zA-Z0-9!@#$%^&*]{6}[A-Z]$/;
        const symbolCount = (password.match(/[!@#$%^&*]/g) || []).length;
        return passwordRegex.test(password) && symbolCount >= 2;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { email, password, confirmPassword } = formData;

        if (!isValidEmail(email)) {
            setError('Invalid email. Please use @gmail.com, .life, or .lk domains.');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Password must be exactly 8 characters, start and end with uppercase letters, and include at least 2 symbols.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await registerUser({ email, password, role: 'viewer' });
            navigate('/viewer-dashboard');
            onClose(); 
        } catch (error) {
            console.error('Registration failed', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
                type="submit"
                className="btn"
                style={{
                    backgroundColor: '#040c0e',
                    color: 'white',
                    width: '100%'
                }}
            >
                Sign Up
            </button>
        </form>
    );
};

export default Signup;
