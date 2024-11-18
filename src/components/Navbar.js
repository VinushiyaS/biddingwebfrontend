import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaShieldAlt,
  FaInfoCircle,
  FaQuestionCircle,
  FaEnvelope,
} from 'react-icons/fa';

const CustomNavbar = () => {
  const navigate = useNavigate();

  // Retrieve user role and email from localStorage
  const userRole = localStorage.getItem('role');
  const userEmail = localStorage.getItem('userEmail');

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');

    // Navigate to the home page
    navigate('/');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar
      className="fixed-top"
      style={{ background: '#040c0e' }}
      expand="lg"
      variant="dark"
    >
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/logo8.png"
            alt="CrickBidders Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Center links */}
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-center">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-light">
              <FaHome /> Home
            </Nav.Link>

            {(userRole === 'leader' || userRole === 'admin') && (
              <Nav.Link as={Link} to="/payment" className="text-light">
                <FaUser /> Leader
              </Nav.Link>
            )}

            {userRole === 'admin' && (
              <Nav.Link as={Link} to="/admin-dashboard" className="text-light">
                <FaShieldAlt /> Admin
              </Nav.Link>
            )}

            <Nav.Link onClick={() => scrollToSection('about')} className="text-light">
              <FaInfoCircle /> About
            </Nav.Link>
            <Nav.Link onClick={() => scrollToSection('how-to-use')} className="text-light">
              <FaQuestionCircle /> Help
            </Nav.Link>
            <Nav.Link onClick={() => scrollToSection('contact')} className="text-light">
              <FaEnvelope /> Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Login/Logout on the right */}
        <div className="d-flex">
          {userEmail && userRole ? (
            <Button variant="outline-light" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-light">
              Log In
            </Nav.Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
