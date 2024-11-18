import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ background: '#040c0e' }} className="py-4 mt-4">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
                        <p className="mb-0 text-light">
                            &copy; {new Date().getFullYear()} CrickBidders. All Rights Reserved.
                        </p>
                        
                    </Col>
                    <Col xs={12} md={6}>
                        <Nav className="justify-content-center justify-content-md-end">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/privacy" className="text-light">
                                    Privacy Policy
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/terms" className="text-light">
                                    Terms of Service
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;