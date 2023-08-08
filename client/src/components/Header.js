import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import { NavDropdown, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import {emptyAccount, testAccount} from "../redux/accountReducers/accountReducer";

const Header = ({ user }) => {
    const {logout, currentUser} = useAuth();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let uid = 0;
    if (currentUser !== null) {
        uid = currentUser.uid;
    }

    const handleSelect = async (eventKey) => {
        if (eventKey === "logout" && currentUser !== undefined) {
            setError("");
            try {
                await logout();
                dispatch(emptyAccount());
                navigate(`/`);
            } catch (e) {
                setError("Cannot log out because: " + e.message);
            }
        } else if (eventKey === "test") {
            dispatch(testAccount());
        } else {
            navigate(`/${uid}` + eventKey);
        }
    }

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="justify-content-end">
            <Container>
                <Navbar.Text>{uid===0 ? "Not signed in yet" : `Signed in as: ${currentUser.email}`}</Navbar.Text>
                <NavDropdown title="Menu" id="collasible-nav-dropdown" onSelect={handleSelect}>
                    <NavDropdown.Item eventKey="/">Main</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/profile">Account Profile</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/chat">Chat&Friends</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/matching">Matching</NavDropdown.Item>
                    <NavDropdown.Item eventKey="logout">Log Out</NavDropdown.Item>
                    {/*<NavDropdown.Item eventKey="test">Print Current Account</NavDropdown.Item>*/}
                </NavDropdown>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Header);
