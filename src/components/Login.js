import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'viewer' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(formData);  // Send role along with email and password
            login(data.user);  // Set the user data to the context
            if (formData.role === 'viewer') navigate('/viewer-dashboard');
            else if (formData.role === 'leader') navigate('/payment');
            else if (formData.role === 'admin') navigate('/admin-dashboard');
        } catch (error) {
            setError("Login failed. Please check your credentials.");
            console.error("Login Error:", error);
        }
    };
    
    
    return (
        <div className="login-container">
            <h2>Log In to CrickBidders</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                />
                <select name="role" onChange={handleChange}>
                    <option value="viewer">Viewer</option>
                    <option value="leader">Leader</option>
                    <option value="admin">Admin</option>
                </select>
                {error && <p className="error">{error}</p>}
                <button type="submit">Log In</button>
            </form>
            <p className="signup-link">
                Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
