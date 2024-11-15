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

    // Handle scrolling to the sections
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="navbar">
 <Link to="/" className="logo-link">
                <img src="/images/FINalLogo.png" alt="CrickBidders Logo" className="logo" />
            </Link>            <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                
                {/* Show the Leader link if the user role is either "leader" or "admin" */}
                {(userRole === 'leader' || userRole === 'admin') && (
                    <Link to="/payment" className="nav-link">Leader</Link>
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
                        <Link to="/login" className="nav-link">Log In</Link>
                    </>
                )}
                
                <button onClick={() => scrollToSection('about')} className="nav-link">About</button> {/* Scroll to About Section */}
                <button onClick={() => scrollToSection('how-to-use')} className="nav-link">How</button> {/* Scroll to How Section */}
                <button onClick={() => scrollToSection('contact')} className="nav-link">Contact Us</button> {/* Scroll to Contact Section */}

            </nav>
        </header>
    );
};

export default Navbar;
