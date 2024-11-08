// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import ViewerDashboard from './components/ViewerDashboard';
import LeaderDashboard from './components/LeaderDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminSidebar from './components/AdminSidebar';

import PaymentPage from './components/PaymentPage';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

import './App.css';
function App() {
    return (
        <AuthProvider>
            <Router>
              <Navbar/>
              <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
                    <Route path="/leader-dashboard" element={<LeaderDashboard />} />
                    <Route path="/admin-sidebar" element={<AdminDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminSidebar />} />

                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/navbar" element={<Navbar />} />

                </Routes>
                </main>
                <Footer/>
            </Router>
        </AuthProvider>
    );
}

export default App;
