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
            <ul>
                {auctions.map((auction) => (
                    <li key={auction._id}>{auction.tournamentName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewerDashboard;
