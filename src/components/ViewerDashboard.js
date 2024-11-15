import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewerDashboard() {
  const [auctions, setAuctions] = useState([]); // State to hold the auctions data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Prevent page reload on first visit
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
      window.location.reload();
    }
  }, []);

  
  useEffect(() => {
    console.log("Auctions state updated:", auctions);
  }, [auctions]); // This will trigger every time `auctions` changes
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auctions/')
      .then((response) => {
        setAuctions(response.data.auctions); // if response.data.auctions is the array
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch auctions');
        setLoading(false);
      });
  }, []); // Run only on component mount
  

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      {Array.isArray(auctions) && auctions.length > 0 ? (
        auctions.map(auction => (
          <div key={auction._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{auction.tournamentName || "No Tournament Name"}</h2>
            <p><strong>Leader Email:</strong> {auction.leaderEmail || "No Email Provided"}</p>
            <p><strong>Bid Points Per Team:</strong> {auction.bidPointsPerTeam || "N/A"}</p>
            
            <h3>Teams:</h3>
            {auction.teams && auction.teams.length > 0 ? (
              auction.teams.map((team, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>{team.name || "No Team Name"}</h4>
                  <p><strong>Bid Points:</strong> {team.bidPoints}</p>
                  <p><strong>Remaining Bid Points:</strong> {team.remainingBidPoints}</p>
                  {team.image && <img src={team.image} alt={team.name} style={{ width: '100px', height: 'auto' }} />}
                </div>
              ))
            ) : (
              <p>No teams available.</p>
            )}

            <h3>Players:</h3>
            {auction.players && auction.players.length > 0 ? (
              auction.players.map((player, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h4>{player.name || "No Player Name"}</h4>
                  <p><strong>Bid Amount:</strong> {player.bidAmount || "N/A"}</p>
                  {player.photo && <img src={player.photo} alt={player.name} style={{ width: '50px', height: 'auto' }} />}
                  {/* Add more player details as necessary */}
                </div>
              ))
            ) : (
              <p>No players listed.</p>
            )}
          </div>
        ))
      ) : (
        <p>No auctions found.</p>
      )}
    </div>
  );
  
};
