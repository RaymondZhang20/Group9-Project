import './LoginRegister.css';
import {Container, Card, Button, Form, Alert} from 'react-bootstrap'
import {useEffect, useRef, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {useAuth} from "../contexts/AuthContext";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuthError, setLoadingLogReg} from "../redux/accountReducers/accountReducer";
import {createAccountAsync, getAccountAsync} from "../redux/accountReducers/accountThunks";

export default function Login() {
    const accountRef = useRef();
    const passwordRef = useRef();
    const {login, currentUser} = useAuth();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.account).loading_login_register;
    const error = useSelector(state => state.account).auth_error;
    const location = useLocation();
    let eee = 0;
    useEffect(() => {
        eee++;
        if (location.state !== null && eee===1) {
            const newAccount = {
                uid: currentUser.uid,
                account_name: location.state,
                email: currentUser.email
            }
            dispatch(createAccountAsync(newAccount));
        }
        if (location.state === null && currentUser !== null) {
            navigate("/0");
        }
    }, []);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (passwordRef.current.value === "" || accountRef.current.value === "") {
            dispatch(setAuthError(" Please enter your email/account and password"));
        } else {
            try {
                dispatch(setLoadingLogReg(true));
                dispatch(setAuthError(""));
                await login(accountRef.current.value, passwordRef.current.value);
            } catch (e) {
                dispatch(setAuthError("Cannot log you in because: " + e.message));
            }
            navigate("/0");
            dispatch(setLoadingLogReg(false));
        }
    }
    return (
        <div id="Login-whole">
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