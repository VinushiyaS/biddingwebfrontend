// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 CrickBidders. All Rights Reserved.</p>
            <nav>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link> | 
                <Link to="/terms" className="footer-link">Terms of Service</Link>
            </nav>
        </footer>
    );
};

export default Footer;
