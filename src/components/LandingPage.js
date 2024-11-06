// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import Navbar from './Navbar';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <main className="main-content">
                <h1>Welcome to CrickBidders</h1>
                <p>Your ultimate platform for cricket auctions!</p>
                <div className="button-container">
                    <Link to="/signup" className="button">Get Started</Link>
                    <Link to="/login" className="button">Log In</Link>
                </div>
            </main>
            
        </div>
    );
};

export default LandingPage;
