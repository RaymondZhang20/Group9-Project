import './LoginRegister.css';
import {Container, Card, Button, Form, Alert} from 'react-bootstrap'
import {useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Register() {
    const emailRef = useRef();
    const accountRef = useRef();
    const passwordRef = useRef();
    const conPasswordRef = useRef();
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        if (passwordRef.current.value !== conPasswordRef.current.value) {
            setError("Two Passwords do not match");
        } else {
            try {
                setLoading(true);
                setError("");
                await register(emailRef.current.value, passwordRef.current.value);
                setShowAlert(true);
                navigate("/login");
            } catch (e) {
                setError("Cannot create the account because: " + e.message);
            }
            setLoading(false);
        }
    }
    return (
        <div id="Register-whole">
            {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible >
                <Alert.Heading>The account has been created</Alert.Heading>
                <p>please login</p>
            </Alert>}
        <Container className="Register-container align-items-center justify-content-center d-flex">
            <Card>
                <Card.Body>
                    <h1 className="text-center">Register</h1>
                    <p className="text-center">If you already have an account, please <br/><Link to="/login">LOGIN</Link></p>
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group id="email-register">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="account-register">
                            <Form.Label>Account</Form.Label>
                            <Form.Control type="text" placeholder="AccountName" ref={accountRef} required/>
                        </Form.Group>
                        <Form.Group id="password-register">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={conPasswordRef} required/>
                        </Form.Group>
                        <div className="text-center">
                            <Button disabled={loading} className="w-75 mt-3" type="submit">Register</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}