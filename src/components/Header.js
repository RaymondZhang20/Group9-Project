import React from 'react';
import { connect } from 'react-redux';
import { NavDropdown, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
    const navigate = useNavigate();

    const handleSelect = (eventKey) => navigate(eventKey);

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="justify-content-end">
            <Container>
                <Navbar.Text>Signed in as: </Navbar.Text>
                <NavDropdown title="Menu" id="collasible-nav-dropdown" onSelect={handleSelect}>
                    <NavDropdown.Item eventKey="/profile">Account Profile</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/chat">Chat</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/matching">Matching</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/map">Map</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Header);
