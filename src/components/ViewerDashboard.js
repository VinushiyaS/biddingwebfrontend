// src/components/ViewerDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchAuctions } from '../api';

const ViewerDashboard = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const getAuctions = async () => {
            try {
                const { data } = await fetchAuctions();
                setAuctions(data);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };
        getAuctions();
    }, []);

    return (
        <div>
            <h2>Live Auctions</h2>
            {auctions.length > 0 ? (

            <ul>
                {auctions.map((auction) => (
                    <li key={auction._id}><h4>{auction.tournamentName}</h4>
                    <p>Date: {new Date(auction.tournamentDate).toLocaleDateString()}</p>
                    <p>Teams: {auction.numTeams}</p>
                    <p>Total Points: {auction.totalPoints}</p>
                </li>
                ))}
            </ul>
            ):(
                <p>No auctions available yet.</p>
            )}

        </div>
    );
};

export default ViewerDashboard;
