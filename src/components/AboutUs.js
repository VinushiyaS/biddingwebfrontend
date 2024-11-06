// src/components/AboutUs.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About CrickBidders</h1>
            <p>
                CrickBidders is a premier platform dedicated to cricket enthusiasts and organizers 
                who want to engage in online auctions for cricket tournaments. Our mission is to 
                make cricket auctions accessible and enjoyable for teams, players, and fans alike.
            </p>
            <p>
                Whether you're a player, a team manager, or a cricket fan, CrickBidders offers a 
                dynamic and transparent auction system that keeps the spirit of the game alive.
            </p>
        </div>
    );
};

export default AboutUs;
