import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Get the user role and email from local storage
    const userRole = localStorage.getItem('role');
    const userEmail = localStorage.getItem('userEmail');

    // Handle logout
    const handleLogout = () => {
        // Clear user information from local storage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        
        // Redirect to the home page
        navigate('/');
    };

    return (
        <header className="navbar">
            <h2 className="logo">CrickBidders</h2>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                
                {/* Show the Leader link if the user role is either "leader" or "admin" */}
                {(userRole === 'leader' || userRole === 'admin') && (
                    <Link to="/leader-dashboard" className="nav-link">Leader</Link>
                )}

                {/* Show the Admin link only if the user role is "admin" */}
                {userRole === 'admin' && (
                    <Link to="/admin-dashboard" className="nav-link">Admin</Link>
                )}

                {/* Show "Logout" if userEmail and role exist, otherwise show Sign Up and Log In */}
                {userEmail && userRole ? (
                    <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                ) : (
                    <>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                        <Link to="/login" className="nav-link">Log In</Link>
                    </>
                )}
                
                <Link to="/aboutus" className="nav-link">About Us</Link>
            </nav>
        </header>
    );
};

export default Navbar;
