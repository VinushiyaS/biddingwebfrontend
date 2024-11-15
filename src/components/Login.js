import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, getUserRole } from '../api';  // Assuming getUserRole is defined in ../api
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'viewer' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                try {
                    const { data } = await getUserRole(storedEmail);  // API call to get user role by email
                    localStorage.setItem('role', data.role);  // Store role in local storage
                } catch (err) {
                    console.error('Failed to fetch user role:', err);
                }
            }
        };
        fetchUserRole();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        // Check if the email and password match the admin credentials
        if (email === 'vinushiya779@gmail.com' && password === 'Melvin@2002') {
            formData.role = 'admin';  // Automatically assign 'admin' role
        }

        try {
            const { data } = await loginUser(formData);
            login(data.user);
            localStorage.setItem('userEmail', email);  // Store email in local storage
            localStorage.setItem('role', formData.role);  // Store selected role in local storage

            // Navigate based on role
            if (formData.role === 'admin') {
                navigate('/viewer-dashboard');
            } else {
                navigate('/viewer-dashboard');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
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
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    required
                >
                    <option value="viewer">Viewer</option>
                    <option value="leader">Leader</option>
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
