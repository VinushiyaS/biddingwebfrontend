import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-image-container">
                <img src="./images//player-removebg-preview.png" alt="Cricket Auction" className="landing-image" />
            </div>
            <main className="main-content">
                <h1>Welcome to CrickBidders</h1>
                <p>Your ultimate platform for cricket auctions!</p>
                <div className="button-container">
                    <Link to="/signup" className="button">Get Started</Link>
                    <Link to="/login" className="button">Log In</Link>
                </div>
            </main>

            {/* About Us Section */}
            <section id="about" className="card about-section">
                <h2>About Us</h2>
                <p>CrickBidders is a premier platform dedicated to cricket enthusiasts and organizers 
                who want to engage in online auctions for cricket tournaments. Our mission is to 
                make cricket auctions accessible and enjoyable for teams, players, and fans alike.</p>
            </section>

            {/* How to Use Section */}
            <section id="how-to-use" className="card how-to-use-section">
                <h2>How to Use CrickBidders</h2>
                <ul>
                    <li>Register as a committee leader, team head, or player.</li>
                    <li>Set up an auction or join an existing team.</li>
                    <li>Bid on players, track points, and build your team!</li>
                </ul>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="card contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions or need support, feel free to reach out.</p>
                <form action="submit_form.php" method="POST">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                    
                    <button type="submit">Send</button>
                </form>
            </section>
        </div>
    );
};

export default LandingPage;
