import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser , FaSignInAlt, FaInfoCircle, FaTrophy } from 'react-icons/fa';
import Signup from './Signup'; // Import your Signup component
import Login from './Login'; // Import your Login component
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap

const LandingPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowSignupModal(true); // Show the signup modal when "Get Started" is clicked
  };

  const handleLogin = () => {
    setShowLoginModal(true); // Show the login modal when "Login" is clicked
  };

  const handleCloseSignup = () => {
    setShowSignupModal(false); // Close the signup modal
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false); // Close the login modal
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#99EDC3' }}>
      {/* Hero Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold mb-3">
              We create solutions for your cricket auctions
            </h1>
            <p className="text-dark mb-4">
              Our platform provides a seamless and streamlined solution for organizing and participating in cricket auctions, making team building easier than ever.
            </p>
            <button
              className="btn"
              style={{ backgroundColor: '#040c0e', color: 'white' }}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-dark ms-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="../images/player-removebg-preview.png"
              alt="Hero illustration"
              className="img-fluid rounded"
              style={{ maxWidth: '70%' }} // Reducing the image size
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">We Provide The Best Services</h2>
        <div className="row g-4">
          {[
            { icon: <FaUser  style={{ color: '#049c0e' }} />, title: "User  Management", desc: "Complete player and team registration system" },
            { icon: <FaTrophy style={{ color: '#049c0e' }} />, title: "Live Auctions", desc: "Real-time bidding and team management" },
            { icon: <FaInfoCircle style={{ color: '#049c0e' }} />, title: "Analytics", desc: "Comprehensive player and team statistics" },
            { icon: <FaSignInAlt style={{ color: '#049c0e' }} />, title: "Tournament", desc: "Complete tournament organization tools" },
          ].map((service, i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="card shadow-sm" style={{
                background: 'rgba(0, 255, 0, 0.2)', // Semi-transparent green background
                backdropFilter: 'blur(10px)', // Apply the blur effect
                borderRadius: '8px', // Optional: to give rounded corners
              }}>
                <div className="card-body text-center">
                  <div
                    className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                    style={{ width: '50px', height: '50px', backgroundColor: '#0f6efd' }}
                  >
                    {service.icon}
                  </div>
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text text-dark">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Solutions Section */}
      <div className="container my-5">
        <div className="row align-items-center bg-opacity-25 p-4 rounded" style={{ backgroundColor: '#06efd' }}>
          <div className="col-md-6">
            <h2 className="fw-bold mb-4">Simple Solutions!</h2>
            <p className="text-dark mb-4">
              We understand that cricket auctions can be complex. Here's how we make them simple:
            </p>
            <ul className="list-group">
              {[
                "Register and create your profile",
                "Join or create an auction",
                "Set your budget and strategy",
                "Start bidding on players",
              ].map((step, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex align-items-center"
                  style={{ background: 'rgba(0, 255, 0, 0.2)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="badge bg-dark text-white me-3">{i + 1}</div>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="../images/cr.png"
              alt="Solutions illustration"
              className="img-fluid rounded"
              style={{ maxWidth: '80%' }} // Reducing the image size
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">What Clients Say!</h2>
        <div className="row g-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body" style={{ background: 'rgba(0, 255, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="bg-dark rounded-circle me-3"
                      style={{ width: '50px', height: '50px' }}
                    ></div>
                    <div>
                      <h6 className="fw-bold mb-0">John Smith</h6>
                      <small className="text-dark">Team Manager</small>
                    </div>
                  </div>
                  <p className="text-dark">
                    "CrickBidders made our auction process incredibly smooth. The platform is intuitive and feature-rich."
                  </p>
                  <div className="text-#144893">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="container my-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body" style={{ background: 'rgba(0, 255, 0, 0.3)', backdropFilter: 'blur(10px)' }}>
            <h2 className="text-center fw-bold mb-4">Ready to get started?</h2>
            <form>
              <div className="mb-3">
                <input 
                  type="text" className="form-control" 
                  placeholder="Name" 
                  style={{ color: 'white', borderColor: '#040c0e' }} 
                />
              </div>
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Email" 
                  style={{ color: 'white', borderColor: '#040c0e' }} 
                />
              </div>
              <div className="mb-3">
                <textarea 
                  className="form-control" 
                  rows="5" 
                  placeholder="Your message"
                  style={{ color: 'white', borderColor: '#040 c0e' }}
                ></textarea>
              </div>
              <button type="submit" className="btn" style={{ backgroundColor: '#040c0e', color: 'white', width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={handleCloseSignup} dialogClassName="modal-90w" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-transparent d-flex justify-content-center align-items-center">
          <Signup onClose={handleCloseSignup} />
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLogin} dialogClassName="modal-90w" centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-transparent d-flex justify-content-center align-items-center">
          <Login onClose={handleCloseLogin} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LandingPage;