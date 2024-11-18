import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewerDashboard() {
  const [auctions, setAuctions] = useState([]); // State to hold the auctions data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State for error handling
  const [topPlayer, setTopPlayer] = useState(null); // State for top bid player

  useEffect(() => {
    // Prevent page reload on first visit
    if (!sessionStorage.getItem('hasVisited')) {
      sessionStorage.setItem('hasVisited', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    console.log('Fetching auctions...');
    axios
      .get('http://localhost:5000/api/auctions/')
      .then((response) => {
        console.log('API response:', response.data); // Add log to check API response
        const fetchedAuctions = response.data.auctions;

        setAuctions(fetchedAuctions); // Save auctions data
        setLoading(false);

        // Find the top bid player across all auctions
        let highestBidPlayer = null;
        fetchedAuctions.forEach((auction) => {
          auction.players?.forEach((player) => {
            if (
              !highestBidPlayer || 
              (player.bidAmount && player.bidAmount > highestBidPlayer.bidAmount)
            ) {
              highestBidPlayer = player;
            }
          });
        });
        setTopPlayer(highestBidPlayer);
      })
      .catch((err) => {
        console.error('API error:', err); // Log error details
        setError('Failed to fetch auctions');
        setLoading(false);
      });
  }, []); // Run only on component mount

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ backgroundColor: '#99EDC3', minHeight: '10vh', padding: '20px', maxWidth: '100%' }}>
      <h1 className="text-center mb-4">Viewer Dashboard</h1>

      {topPlayer && (
        <div className="card mb-4 shadow-lg">
          <div className="card-header bg-success text-white">
            <h2>Top Bid Player</h2>
          </div>
          <div className="card-body text-center">
            <h4>{topPlayer.name || "Unknown Player"}</h4>
            <p>
              <strong>Bid Amount:</strong> {topPlayer.bidAmount || "N/A"}
            </p>
            {topPlayer.photo && (
              <img
                src={topPlayer.photo}
                alt={topPlayer.name}
                className="img-fluid rounded-circle"
                style={{ maxWidth: '100px', height: '100px' }}
              />
            )}
          </div>
        </div>
      )}

      {Array.isArray(auctions) && auctions.length > 0 ? (
        auctions.map((auction) => (
          <div key={auction._id} className="card mb-4 shadow-sm">
            <div className="card-header bg-dark text-white">
              <h2 className="card-title">{auction.tournamentName || "No Tournament Name"}</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Leader Email:</strong> {auction.leaderEmail || "No Email Provided"}
              </p>
              <p>
                <strong>Bid Points Per Team:</strong> {auction.bidPointsPerTeam || "N/A"}
              </p>

              <h3 className="mt-3">Teams:</h3>
              {auction.teams && auction.teams.length > 0 ? (
                <div className="row">
                  {auction.teams.map((team, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card mb-3 border-success">
                        <div className="card-body">
                          <h4 className="card-title">{team.name || "No Team Name"}</h4>
                          <p>
                            <strong>Bid Points:</strong> {team.bidPoints}
                          </p>
                          <p>
                            <strong>Remaining Bid Points:</strong> {team.remainingBidPoints}
                          </p>
                          {team.image && (
                            <img
                              src={team.image}
                              alt={team.name}
                              className="img-fluid rounded"
                              style={{ maxWidth: '100px', height: 'auto' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No teams available.</p>
              )}

              <h3 className="mt-3">Players:</h3>
              {auction.players && auction.players.length > 0 ? (
                <div className="row">
                  {auction.players.map((player, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card mb-3 border-warning">
                        <div className="card-body text-center">
                          <h4 className="card-title">{player.name || "No Player Name"}</h4>
                          <p>
                            <strong>Bid Amount:</strong> {player.bidAmount || "N/A"}
                          </p>
                          {player.photo && (
                            <img
                              src={player.photo}
                              alt={player.name}
                              className="img-fluid rounded-circle"
                              style={{ maxWidth: '50px', height: '50px' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No players available.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No auctions found.</p>
      )}
    </div>
  );
}
