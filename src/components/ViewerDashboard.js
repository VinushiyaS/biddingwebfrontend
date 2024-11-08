import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewerDashboard() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assume we have a way to fetch currentUserId (like from session storage or context)
  const currentUserId = sessionStorage.getItem('userId'); // Example, replace with actual method to get user ID

  useEffect(() => {
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    // API call to fetch auctions
    axios.get('http://localhost:5000/api/auctions')
      .then(response => {
        setAuctions(response.data); // Save auctions data to state
        setLoading(false);           // Set loading to false once data is fetched
      })
      .catch(err => {
        setError('Failed to fetch auctions'); // Error handling
        setLoading(false);
      });
  }, []);

  const handleRequestLeader = (tournamentId) => {
    // Make an API request or process logic for the leader request
    if (!currentUserId) {
      alert('User not logged in');
      return;
    }

    axios.post('http://localhost:5000/api/request-leader', {
      userId: currentUserId,  // Use actual user ID
      tournamentId: tournamentId,  // Pass the tournament ID
    })
    .then(response => {
      alert('Your request to become a leader has been sent to the admin!');
    })
    .catch(error => {
      alert('Error sending request to admin.');
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Viewer Dashboard</h1>
      {auctions.length > 0 ? (
        <div>
          {auctions.map((auction) => (
            <div key={auction._id}>
              <h2>{auction.tournamentName}</h2>
              <p>Date: {new Date(auction.tournamentDate).toLocaleDateString()}</p>
              <p>Teams: {auction.teamsCount}</p>
              <p>Total Points per Team: {auction.totalPointsPerTeam}</p>
              <p>Status: {auction.isLive ? 'Live' : 'Completed'}</p>
              {auction.players.length > 0 && (
                <div>
                  <h3>Players</h3>
                  <ul>
                    {auction.players.map((player) => (
                      <li key={player._id}>
                        <img src={player.profilePic} alt={player.name} width="50" />
                        <p>{player.name}</p>
                        <p>Team: {player.team}</p>
                        <p>Bid Points: {player.bidPoints}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button for requesting to be leader */}
              <button onClick={() => handleRequestLeader(auction._id)}>
                Request to Become Leader
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No auctions found.</p>
      )}
    </div>
  );
}
