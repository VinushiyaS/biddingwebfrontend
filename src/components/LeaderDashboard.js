import React, { useState } from 'react';

export default function LeaderDashboard() {
  const [formData, setFormData] = useState({
    leaderEmail: '',
    tournamentName: '',
    teamsCount: 0,
    bidPointsPerTeam: 0,
    teams: [],
    players: [], // Array for player profiles
  });

  const [submittedData, setSubmittedData] = useState(null); // To hold the submitted data

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'teamsCount' || name === 'bidPointsPerTeam' ? parseInt(value) : value;

    setFormData((prevData) => {
      if (name === 'teamsCount') {
        const updatedTeams = Array.from({ length: newValue || 0 }, (_, index) => ({
          name: prevData.teams[index]?.name || '',
          bidPoints: prevData.bidPointsPerTeam || 0,
          remainingBidPoints: prevData.bidPointsPerTeam || 0, // Initialize remaining bid points
        }));
        return {
          ...prevData,
          teamsCount: newValue,
          teams: updatedTeams,
        };
      }

      if (name === 'bidPointsPerTeam') {
        const updatedTeams = prevData.teams.map((team) => ({
          ...team,
          bidPoints: newValue || 0,
          remainingBidPoints: newValue || 0, 
        }));
        return {
          ...prevData,
          bidPointsPerTeam: newValue,
          teams: updatedTeams,
        };
      }

      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  const handleTeamChange = (index, value) => {
    const updatedTeams = [...formData.teams];
    updatedTeams[index] = {
      ...updatedTeams[index],
      name: value,
    };
    setFormData({
      ...formData,
      teams: updatedTeams,
    });
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...formData.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      players: updatedPlayers,
    });
  };

  const addPlayer = () => {
    setFormData({
      ...formData,
      players: [...formData.players, { name: '', photo: null, bidAmount: 0, team: '', done: false }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  const handleDone = (index) => {
    const updatedPlayers = [...formData.players];
    const player = updatedPlayers[index];

    if (player.team && player.bidAmount > 0) {
      const teamIndex = formData.teams.findIndex((team) => team.name === player.team);

      if (teamIndex !== -1 && formData.teams[teamIndex].remainingBidPoints >= player.bidAmount) {
        // Mark player as done
        updatedPlayers[index].done = true;

        // Subtract bid amount from team's remaining bid points
        const updatedTeams = [...formData.teams];
        updatedTeams[teamIndex].remainingBidPoints -= player.bidAmount;

        // Update form data
        setFormData({
          ...formData,
          players: updatedPlayers,
          teams: updatedTeams,
        });
      } else {
        alert("Insufficient points for this team.");
      }
    }
  };

  // Function to get the player with the highest bid amount
  const getHighestBidPlayer = () => {
    return formData.players.reduce((highest, player) =>
      player.bidAmount > (highest?.bidAmount || 0) ? player : highest,
      null
    );
  };

  return (
    <div>
      <h1>Leader Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="leaderEmail"
          value={formData.leaderEmail}
          onChange={handleChange}
          placeholder="Leader Email"
          required
        />
        <input
          type="text"
          name="tournamentName"
          value={formData.tournamentName}
          onChange={handleChange}
          placeholder="Tournament Name"
          required
        />
        <input
          type="number"
          name="teamsCount"
          value={formData.teamsCount}
          onChange={handleChange}
          placeholder="Number of Teams"
          required
        />
        <input
          type="number"
          name="bidPointsPerTeam"
          value={formData.bidPointsPerTeam}
          onChange={handleChange}
          placeholder="Bid Points Per Team"
          required
        />

        <div>
          <h3>Team Names</h3>
          {formData.teams.map((team, index) => (
            <div key={index}>
              <input
                type="text"
                value={team.name}
                onChange={(e) => handleTeamChange(index, e.target.value)}
                placeholder={`Team ${index + 1} Name`}
                required
              />
              <span> - Remaining Points: {team.remainingBidPoints}</span>
            </div>
          ))}
        </div>

        <div>
          <h3>Players</h3>
          {formData.players.map((player, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                placeholder={`Player ${index + 1} Name`}
                required
                disabled={player.done}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePlayerChange(index, 'photo', e.target.files[0])}
                disabled={player.done}
              />
              <select
                value={player.team}
                onChange={(e) => handlePlayerChange(index, 'team', e.target.value)}
                disabled={player.done}
              >
                <option value="">Select Team</option>
                {formData.teams.map((team, idx) => (
                  <option key={idx} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={player.bidAmount}
                onChange={(e) => handlePlayerChange(index, 'bidAmount', parseInt(e.target.value) || 0)}
                placeholder="Bid Amount"
                disabled={player.done}
              />
              <button
                type="button"
                onClick={() => handleDone(index)}
                disabled={player.done || !player.team || player.bidAmount <= 0}
              >
                {player.done ? 'Done' : 'Mark as Done'}
              </button>
            </div>
          ))}
          <button type="button" onClick={addPlayer}>Add Player</button>
        </div>

        <button type="submit">Submit Tournament</button>
      </form>

      {submittedData && (
        <div>
          <h2>Tournament Information</h2>
          <h3>Tournament: {submittedData.tournamentName}</h3>
          <h4>Teams</h4>
          {submittedData.teams.map((team, index) => (
            <div key={index}>
              <h5>{team.name}</h5>
              <p>Remaining Points: {team.remainingBidPoints}</p>
            </div>
          ))}

          <h4>Players</h4>
          {submittedData.players.map((player, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>Name: {player.name}</p>
              {player.photo ? (
                <img
                  src={URL.createObjectURL(player.photo)}
                  alt={`Player ${index + 1} Photo`}
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              ) : (
                <p>No Photo Selected</p>
              )}
              <p>Team: {player.team}</p>
              <p>Bid Amount: {player.bidAmount}</p>
              <p>Status: {player.done ? "Done" : "Pending"}</p>
            </div>
          ))}

          {/* Displaying the player with the highest bid */}
          <h4>Top Bid Player</h4>
          {getHighestBidPlayer() ? (
            <div>
              <p>Name: {getHighestBidPlayer().name}</p>
              <p>Team: {getHighestBidPlayer().team}</p>
              <p>Bid Amount: {getHighestBidPlayer().bidAmount}</p>
              {getHighestBidPlayer().photo && (
                <img
                  src={URL.createObjectURL(getHighestBidPlayer().photo)}
                  alt="Top Player Photo"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              )}
            </div>
          ) : (
            <p>No players with bids yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
