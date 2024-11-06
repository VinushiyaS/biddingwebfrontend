// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="navbar">
            <h2 className="logo">CrickBidders</h2>
            <nav className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/login" className="nav-link">Log In</Link>
                <Link to="/aboutus" className="nav-link">AboutUs</Link>
            </nav>
        </header>
    );
};

export default Navbar;
