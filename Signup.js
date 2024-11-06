// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'viewer' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/viewer-dashboard');
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
            <select name="role" onChange={handleChange}>
                <option value="viewer">Viewer</option>
                <option value="leader">Leader</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
