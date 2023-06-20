import './LoginRegister.css';
import {Container, Card, Button, Form, Alert} from 'react-bootstrap'
import {useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {useAuth} from "../contexts/AuthContext";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function Login() {
    const accountRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login, currentUser} = useAuth();

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (passwordRef.current.value === "" || accountRef.current.value === "") {
            setError(" Please enter your email/account and password");
        } else {
            try {
                setLoading(true);
                setError("");
                await login(accountRef.current.value, passwordRef.current.value);
            } catch (e) {
                setError("Cannot log you in because: " + e.message);
            }
            navigate("/0");
            setLoading(false);
        }
    }
    return (
        <div id="Login-whole">
            {currentUser && <Navigate to="/0" />}
            <Container className="Login-container align-items-center justify-content-center d-flex">
                <Card>
                    <Card.Body>
                        <h1 className="text-center">Log In</h1>
                        <p className="text-center">If you don't have an account, please<br/><Link to="/register">REGISTER</Link></p>
                        {error && <Alert variant={"danger"}>{error}</Alert>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group id="account-login">
                                <Form.Label>Email/Account</Form.Label>
                                <Form.Control type="text" placeholder="Please use Email for now" ref={accountRef} required/>
                            </Form.Group>
                            <Form.Group id="password-login">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
                            </Form.Group>
                            <div className="text-center">
                                <Button disabled={loading} className="w-75 mt-3" type="submit">Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}