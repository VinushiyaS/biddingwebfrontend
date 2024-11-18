import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LeaderDashboard() {
  const [formData, setFormData] = useState({
    leaderEmail: '',
    tournamentName: '',
    teamsCount: '',
    bidPointsPerTeam: '',
    teams: [],
    players: [],
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'teamsCount' || name === 'bidPointsPerTeam' ? parseInt(value) : value;

    setFormData((prevData) => {
      if (name === 'teamsCount') {
        const updatedTeams = Array.from({ length: newValue || 0 }, (_, index) => ({
          name: prevData.teams[index]?.name || '',
          bidPoints: prevData.bidPointsPerTeam || 0,
          remainingBidPoints: prevData.bidPointsPerTeam || 0,
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
    updatedTeams[index] = { ...updatedTeams[index], name: value };
    setFormData({ ...formData, teams: updatedTeams });
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...formData.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setFormData({ ...formData, players: updatedPlayers });
  };

  const addPlayer = () => {
    setFormData({
      ...formData,
      players: [...formData.players, { name: '', photo: null, bidAmount: 0, team: '', done: false }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentData = {
      leaderEmail: formData.leaderEmail,
      tournamentName: formData.tournamentName,
      bidPointsPerTeam: formData.bidPointsPerTeam,
      teams: formData.teams.map(team => ({
        name: team.name,
        bidPoints: team.bidPoints,
        remainingBidPoints: team.remainingBidPoints,
      })),
    };

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/auctions/create', tournamentData);
      toast.success('Tournament created successfully');
      console.log('Tournament created successfully', response.data);
      setSubmittedData(formData);  // Show submitted data
    } catch (error) {
      toast.error('Error creating tournament');
      console.error('Error creating tournament', error);
    }
  };

  const handleDone = (index) => {
    const updatedPlayers = [...formData.players];
    const player = updatedPlayers[index];

    if (player.team && player.bidAmount > 0) {
      const teamIndex = formData.teams.findIndex((team) => team.name === player.team);

      if (teamIndex !== -1 && formData.teams[teamIndex].remainingBidPoints >= player.bidAmount) {
        updatedPlayers[index].done = true;
        const updatedTeams = [...formData.teams];
        updatedTeams[teamIndex].remainingBidPoints -= player.bidAmount;

        setFormData({ ...formData, players: updatedPlayers, teams: updatedTeams });
        toast.success(`${player.name} is successfully done!`);
      } else {
        toast.error('Insufficient points for this team.');
      }
    }
  };

  const getHighestBidPlayer = () =>
    formData.players.reduce(
      (highest, player) => (player.bidAmount > (highest?.bidAmount || 0) ? player : highest),
      null
    );

  return (
    <div className="container mt-5" style={{ backgroundColor: '#99EDC3' }}>
      <h1 className="text-center mb-4">Leader Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Leader Email</label>
          <input
            type="email"
            className="form-control"
            name="leaderEmail"
            value={formData.leaderEmail}
            onChange={handleChange}
            placeholder="Enter leader's email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tournament Name</label>
          <input
            type="text"
            className="form-control"
            name="tournamentName"
            value={formData.tournamentName}
            onChange={handleChange}
            placeholder="Enter tournament name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Teams</label>
          <input
            type="number"
            className="form-control"
            name="teamsCount"
            value={formData.teamsCount}
            onChange={handleChange}
            placeholder="Enter number of teams"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bid Points Per Team</label>
          <input
            type="number"
            className="form-control"
            name="bidPointsPerTeam"
            value={formData.bidPointsPerTeam}
            onChange={handleChange}
            placeholder="Enter bid points per team"
            required
          />
        </div>

        <div className="mb-4">
          <h3>Team Names</h3>
          {formData.teams.map((team, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={team.name}
                onChange={(e) => handleTeamChange(index, e.target.value)}
                placeholder={`Team ${index + 1} Name`}
                required
              />
              <span className="input-group-text">Remaining Points: {team.remainingBidPoints}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3>Players</h3>
          {formData.players.map((player, index) => (
            <div key={index} className="card mb-3 p-3">
              <div className="row g-3 align-items-center">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={player.name}
                    onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                    placeholder={`Player ${index + 1} Name`}
                    disabled={player.done}
                  />
                </div>
                <div className="col">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => handlePlayerChange(index, 'photo', e.target.files[0])}
                    disabled={player.done}
                  />
                  {player.photo && (
                    <img
                      src={URL.createObjectURL(player.photo)}
                      alt={player.name}
                      className="img-thumbnail mt-2"
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </div>
                <div className="col">
                  <select
                    className="form-select"
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
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    value={player.bidAmount}
                    onChange={(e) => handlePlayerChange(index, 'bidAmount', parseInt(e.target.value))}
                    disabled={player.done}
                    placeholder="Bid Amount"
                  />
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn -primary"
                    onClick={() => handleDone(index)}
                    disabled={player.done}
                  >
                    {player.done ? 'Done' : 'Bid'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addPlayer}>
            Add Player
          </button>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Create Tournament
        </button>
      </form>

      {submittedData && (
  <div className="mt-5">
    <h2>Submitted Data</h2>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Leader Email</td>
          <td>{submittedData.leaderEmail}</td>
        </tr>
        <tr>
          <td>Tournament Name</td>
          <td>{submittedData.tournamentName}</td>
        </tr>
        <tr>
          <td>Number of Teams</td>
          <td>{submittedData.teamsCount}</td>
        </tr>
        <tr>
          <td>Bid Points Per Team</td>
          <td>{submittedData.bidPointsPerTeam}</td>
        </tr>
        <tr>
          <td>Teams</td>
          <td>
            <ul>
              {submittedData.teams.map((team, index) => (
                <li key={index}>{team.name} (Remaining Points: {team.remainingBidPoints})</li>
              ))}
            </ul>
          </td>
        </tr>
        <tr>
          <td>Players</td>
          <td>
            <ul>
              {submittedData.players.map((player, index) => (
                <li key={index}>
                  {player.name} - {player.team} (Bid Amount: {player.bidAmount})
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <tr>
          <td>Top Bid Player</td>
          <td>
            {(() => {
              const highestBidPlayer = getHighestBidPlayer();
              return highestBidPlayer
                ? `${highestBidPlayer.name} - ${highestBidPlayer.team} (Bid: ${highestBidPlayer.bidAmount})`
                : 'No bids yet';
            })()}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)}

      <ToastContainer />
    </div>
  );
}