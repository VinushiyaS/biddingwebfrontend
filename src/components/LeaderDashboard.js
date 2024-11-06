// src/components/LeaderDashboard.js
import React, { useState, useEffect } from 'react';
import { fetchLeaderAuctions, createAuction } from '../api';

const LeaderDashboard = () => {
    const [auctions, setAuctions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAuction, setNewAuction] = useState({
        tournamentName: '',
        tournamentDate: '',
        numTeams: '',
        totalPoints: '',
        players: []
    });
    const [player, setPlayer] = useState({ name: '', number: '', picture: '' });
    const [image, setImage] = useState(null);

    // Fetch existing auctions for this leader on component mount
    useEffect(() => {
        const getLeaderAuctions = async () => {
            const leaderId = "leader-id"; // Replace with actual leader ID from context or props
            try {
                const { data } = await fetchLeaderAuctions(leaderId);
                setAuctions(data);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            }
        };
        getLeaderAuctions();
    }, []);

    // Handle changes for auction form
    const handleAuctionChange = (e) => {
        setNewAuction({ ...newAuction, [e.target.name]: e.target.value });
    };

    // Handle changes for adding players to the auction
    const handlePlayerChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    };

    // Add a player to the players array
    const addPlayer = () => {
        setNewAuction((prev) => ({
            ...prev,
            players: [...prev.players, player]
        }));
        setPlayer({ name: '', number: '', picture: '' }); // Reset player form
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Submit the auction creation form
    const handleCreateAuction = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('tournamentName', newAuction.tournamentName);
            formData.append('tournamentDate', newAuction.tournamentDate);
            formData.append('numTeams', newAuction.numTeams);
            formData.append('totalPoints', newAuction.totalPoints);
            formData.append('image', image); // Add image file to FormData
    
            await createAuction(formData); // Send FormData instead of JSON
            alert('Auction created successfully!');
            setShowForm(false);
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    };



    return (
        
        <div>
            <h2>Leader Dashboard</h2>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Create New Auction'}
            </button>
            <button onClick={() => setShowForm(false)}>View My Auctions</button>

            {/* Auction creation form */}
            {showForm && (
                <form onSubmit={handleCreateAuction} encType="multipart/form-data">
                    <h3>Create New Auction</h3>
                    <input
                        type="text"
                        name="tournamentName"
                        placeholder="Tournament Name"
                        value={newAuction.tournamentName}
                        onChange={handleAuctionChange}
                        required
                    />
                    <input
                        type="date"
                        name="tournamentDate"
                        value={newAuction.tournamentDate}
                        onChange={handleAuctionChange}
                        required
                    />
                    <input
                        type="number"
                        name="numTeams"
                        placeholder="Number of Teams"
                        value={newAuction.numTeams}
                        onChange={handleAuctionChange}
                        required
                    />
                    <input
                        type="number"
                        name="totalPoints"
                        placeholder="Total Points for Teams"
                        value={newAuction.totalPoints}
                        onChange={handleAuctionChange}
                        required
                    />

                    <h4>Add Players</h4>
                    <input
                        type="text"
                        name="name"
                        placeholder="Player Name"
                        value={player.name}
                        onChange={handlePlayerChange}
                    />
                    <input
                        type="text"
                        name="number"
                        placeholder="Player Number"
                        value={player.number}
                        onChange={handlePlayerChange}
                    />
                    <input
                        type="text"
                        name="picture"
                        placeholder="Player Picture URL"
                        value={player.picture}
                        onChange={handlePlayerChange}
                    />
                       <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
        />
                    <button type="button" onClick={addPlayer}>
                        Add Player
                    </button>

                    <button type="submit">Create Auction</button>
                </form>
            )}

            {/* Display existing auctions */}
            {!showForm && (
                <div>
                    <h3>My Auctions</h3>
                    {auctions.length > 0 ? (
                        <ul>
                            {auctions.map((auction) => (
                                <li key={auction._id}>
                                    <h4>{auction.tournamentName}</h4>
                                    <p>Date: {new Date(auction.tournamentDate).toLocaleDateString()}</p>
                                    <p>Teams: {auction.numTeams}</p>
                                    <p>Total Points: {auction.totalPoints}</p>
                                    <button onClick={() => alert('Start Bidding')}>Start Bidding</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No auctions created yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LeaderDashboard;
