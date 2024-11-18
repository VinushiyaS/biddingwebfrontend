import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser , getUserRole } from '../api'; // Assuming getUser Role is defined in ../api
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
                    const { data } = await getUserRole(storedEmail); // API call to get user role by email
                    localStorage.setItem('role', data.role); // Store role in local storage
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
            formData.role = 'admin'; // Automatically assign 'admin' role
        }

        try {
            const { data } = await loginUser (formData);
            login(data.user);
            localStorage.setItem('userEmail', email); // Store email in local storage
            localStorage.setItem('role', formData.role); // Store selected role in local storage

            // Navigate based on role
            navigate('/viewer-dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-card">
                <h2 className="card-title text-center mb-4">Log In to CrickBidders</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
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
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="viewer">Viewer</option>
                            <option value="leader">Leader</option>
                        </select>
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
                    
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;