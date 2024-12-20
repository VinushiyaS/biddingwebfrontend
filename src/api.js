import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Auth APIs
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Fetch user role by email
export const getUserRole = (email) => API.get(`/auth/user/${email}`);

// Auction APIs
export const fetchAuctions = () => API.get('/auctions/auction');
export const fetchLeaderAuctions = (leaderEmail) => API.get(`/auctions/leader/${leaderEmail}`);
export const createAuction = (auctionData) => API.post('/auctions/create-auction', auctionData, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is needed for file uploads
    },
});

// Payment and Summary APIs
export const processPayment = (paymentData) => API.post('/payment', paymentData);
// export const fetchSummary = (auctionId) => API.get(`/auction/${auctionId}/summary`);
