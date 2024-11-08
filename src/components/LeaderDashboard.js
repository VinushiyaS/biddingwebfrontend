// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Importing axios
// import { fetchLeaderAuctions } from '../api';

// const LeaderDashboard = () => {
//     const [auctions, setAuctions] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [newAuction, setNewAuction] = useState({
//         tournamentName: '',
//         tournamentDate: '',
//         numTeams: '',
//         totalPoints: '',
//         players: []
//     });
//     const [player, setPlayer] = useState({ name: '', number: '', picture: '' });
//     const [image, setImage] = useState(null);

//     // Fetch existing auctions for this leader on component mount
//     useEffect(() => {
//         const getLeaderAuctions = async () => {
//             const leaderEmail = localStorage.getItem('userEmail'); // Retrieve leader email from local storage
//             if (!leaderEmail) {
//                 console.error('Leader email not found in local storage');
//                 return;
//             }
//             try {
//                 const { data } = await fetchLeaderAuctions(leaderEmail);
//                 setAuctions(data);
//             } catch (error) {
//                 console.error('Error fetching auctions:', error);
//             }
//         };
//         getLeaderAuctions();
//     }, []);

//     // Handle changes for auction form
//     const handleAuctionChange = (e) => {
//         setNewAuction({ ...newAuction, [e.target.name]: e.target.value });
//     };

//     // Handle changes for adding players to the auction
//     const handlePlayerChange = (e) => {
//         setPlayer({ ...player, [e.target.name]: e.target.value });
//     };

//     // Add a player to the players array
//     const addPlayer = () => {
//         if (!player.name || !player.number) {
//             alert("Please fill out all player fields.");
//             return;
//         }
//         setNewAuction((prev) => ({
//             ...prev,
//             players: [...prev.players, player]
//         }));
//         setPlayer({ name: '', number: '', picture: '' }); // Reset player form
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleCreateAuction = async (e) => {
//         e.preventDefault();

//         // Create FormData to send to the backend
//         const formData = new FormData();
//         formData.append('leaderEmail', localStorage.getItem('userEmail')); // Add leader email
//         formData.append('tournamentName', newAuction.tournamentName);
//         formData.append('tournamentDate', newAuction.tournamentDate);
//         formData.append('teamsCount', newAuction.numTeams);
//         formData.append('totalPointsPerTeam', newAuction.totalPoints);
//         formData.append('image', image); // Include the image file in the FormData
//         formData.append('players', JSON.stringify(newAuction.players)); // Include players as a stringified JSON

//         try {
//             // Send FormData to the backend using axios
//             const response = await axios.post('http://localhost:5000/api/auctions/create-auction', formData);

//             const result = response.data;

//             if (response.status === 200) {
//                 setAuctions([...auctions, result]);
//                 alert('Auction created successfully!');
//                 setShowForm(false);
//             } else {
//                 alert('Failed to create auction');
//                 console.error('Error:', result);
//             }
//         } catch (error) {
//             console.error('Error creating auction:', error);
//             alert('Error creating auction');
//         }
//     };

//     return (
//         <div>
//             <h2>Leader Dashboard</h2>
//             <button onClick={() => setShowForm(!showForm)}>
//                 {showForm ? 'Cancel' : 'Create New Auction'}
//             </button>
//             <button onClick={() => setShowForm(false)}>View My Auctions</button>

//             {/* Auction creation form */}
//             {showForm && (
//                 <form onSubmit={handleCreateAuction} encType="multipart/form-data">
//                     <h3>Create New Auction</h3>
//                     <input
//                         type="text"
//                         name="tournamentName"
//                         placeholder="Tournament Name"
//                         value={newAuction.tournamentName}
//                         onChange={handleAuctionChange}
//                         required
//                     />
//                     <input
//                         type="date"
//                         name="tournamentDate"
//                         value={newAuction.tournamentDate}
//                         onChange={handleAuctionChange}
//                         required
//                     />
//                     <input
//                         type="number"
//                         name="numTeams"
//                         placeholder="Number of Teams"
//                         value={newAuction.numTeams}
//                         onChange={handleAuctionChange}
//                         required
//                     />
//                     <input
//                         type="number"
//                         name="totalPoints"
//                         placeholder="Total Points for Teams"
//                         value={newAuction.totalPoints}
//                         onChange={handleAuctionChange}
//                         required
//                     />

//                     <h4>Add Players</h4>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Player Name"
//                         value={player.name}
//                         onChange={handlePlayerChange}
//                     />
//                     <input
//                         type="text"
//                         name="number"
//                         placeholder="Player Number"
//                         value={player.number}
//                         onChange={handlePlayerChange}
//                     />
//                     <input
//                         type="text"
//                         name="picture"
//                         placeholder="Player Picture URL"
//                         value={player.picture}
//                         onChange={handlePlayerChange}
//                     />
//                     <input type="file" onChange={handleImageChange} />

//                     <button type="button" onClick={addPlayer}>Add Player</button>

//                     <button type="submit">Create Auction</button>
//                 </form>
//             )}

//             <h3>Existing Auctions</h3>
//             <ul>
//                 {auctions.map((auction) => (
//                     <li key={auction._id}>
//                         {auction.tournamentName} - {auction.tournamentDate}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default LeaderDashboard;

import React, { useState } from 'react';
import axios from 'axios';

export default function LeaderDashboard() {
  const [auctionData, setAuctionData] = useState({
    leaderEmail: '',
    tournamentName: '',
    tournamentDate: '',
    teamsCount: 0,
    totalPointsPerTeam: 0,
    players: [
      {
        name: '',
        number: 0,
        team: '',
        bidPoints: 0,
        profilePic: '',
      },
    ],
    image: null, // For handling the uploaded image
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionData({
      ...auctionData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setAuctionData({
      ...auctionData,
      image: e.target.files[0], // Store the selected image file
    });
  };

  // Function to handle player input change
  const handlePlayerChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPlayers = [...auctionData.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
    setAuctionData({
      ...auctionData,
      players: updatedPlayers,
    });
  };

  // Function to add a new player form
  const addPlayer = () => {
    setAuctionData({
      ...auctionData,
      players: [
        ...auctionData.players,
        {
          name: '',
          number: 0,
          team: '',
          bidPoints: 0,
          profilePic: '',
        },
      ],
    });
  };

  // Function to remove a player form
  const removePlayer = (index) => {
    const updatedPlayers = auctionData.players.filter((_, i) => i !== index);
    setAuctionData({
      ...auctionData,
      players: updatedPlayers,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('leaderEmail', auctionData.leaderEmail);
      formData.append('tournamentName', auctionData.tournamentName);
      formData.append('tournamentDate', auctionData.tournamentDate);
      formData.append('teamsCount', auctionData.teamsCount);
      formData.append('totalPointsPerTeam', auctionData.totalPointsPerTeam);

      // Append players array
      auctionData.players.forEach((player, index) => {
        formData.append(`players[${index}][name]`, player.name);
        formData.append(`players[${index}][number]`, player.number);
        formData.append(`players[${index}][team]`, player.team);
        formData.append(`players[${index}][bidPoints]`, player.bidPoints);
        formData.append(`players[${index}][profilePic]`, player.profilePic);
      });

      // Add image if available
      if (auctionData.image) {
        formData.append('image', auctionData.image);
      }

      const response = await axios.post('http://localhost:5000/api/auctions/create-auction', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response after success
      console.log('Auction created successfully', response.data);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <div>
      <h1>Create New Auction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="leaderEmail"
          value={auctionData.leaderEmail}
          onChange={handleChange}
          placeholder="Leader Email"
          required
        />
        <input
          type="text"
          name="tournamentName"
          value={auctionData.tournamentName}
          onChange={handleChange}
          placeholder="Tournament Name"
          required
        />
        <input
          type="date"
          name="tournamentDate"
          value={auctionData.tournamentDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="teamsCount"
          value={auctionData.teamsCount}
          onChange={handleChange}
          placeholder="Teams Count"
          required
        />
        <input
          type="number"
          name="totalPointsPerTeam"
          value={auctionData.totalPointsPerTeam}
          onChange={handleChange}
          placeholder="Total Points Per Team"
          required
        />

        {/* Render Player Info dynamically */}
        <div>
          <h3>Player Info</h3>
          {auctionData.players.map((player, index) => (
            <div key={index}>
              <h4>Player {index + 1}</h4>
              <input
                type="text"
                name="name"
                value={player.name}
                onChange={(e) => handlePlayerChange(e, index)}
                placeholder="Player Name"
                required
              />
              <input
                type="number"
                name="number"
                value={player.number}
                onChange={(e) => handlePlayerChange(e, index)}
                placeholder="Player Number"
                required
              />
              <input
                type="text"
                name="team"
                value={player.team}
                onChange={(e) => handlePlayerChange(e, index)}
                placeholder="Player Team"
                required
              />
              <input
                type="number"
                name="bidPoints"
                value={player.bidPoints}
                onChange={(e) => handlePlayerChange(e, index)}
                placeholder="Bid Points"
                required
              />
              <input
                type="text"
                name="profilePic"
                value={player.profilePic}
                onChange={(e) => handlePlayerChange(e, index)}
                placeholder="Profile Picture URL"
              />
              <button type="button" onClick={() => removePlayer(index)}>Remove Player</button>
            </div>
          ))}
          <button type="button" onClick={addPlayer}>Add Another Player</button>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}
