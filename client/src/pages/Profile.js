import { Button, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useDeferredValue, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { getAccountAsync } from "../redux/accountReducers/accountThunks";
import { useDispatch, useSelector } from "react-redux";
import { emptyAccount } from "../redux/accountReducers/accountReducer";
import { ProfileField } from '../components/ProfileField';
import { act } from "react-dom/test-utils";


export default function Profile() {
    const [error, setError] = useState("");
    const { logout, currentUser } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infoUser = window.location.pathname.split('/')[1];
    let masterView = false;
    let user = [];
    let userInfo = [];
    useEffect(() => {
        dispatch(getAccountAsync(currentUser.uid));
    }, [currentUser]);
    const masterInfo = useSelector(state => state.account.currentUser);
    
    if (currentUser && currentUser.uid === infoUser) {
        masterView = true;
        user = masterInfo;
        userInfo = [{ field: "account Name", value: user.account_name },
        { field: "first", value: user.first_name },
        { field: "last", value: user.last_name },
        { field: "timezone", value: user.time_zone },
        { field: "location", value: user.location },
        { field: "pronoun", value: user.pronoun },
        { field: "time", value: user.play_time },
        { field: "language", value: user.language },
        { field: "platform", value: user.platform }];
    } else {
        try {
            fetch(`http://localhost:5000/users/${infoUser}`, { method: 'GET' }).then((response) => {
                return response.json();
            }).then((data) => {
                user = data;
                // may uptdate later
                userInfo = [{ field: "first", value: user.first_name },
                { field: "last", value: user.last_name },
                { field: "timezone", value: user.time_zone },
                { field: "pronoun", value: user.pronoun },
                { field: "time", value: user.play_time },
                { field: "language", value: user.language },
                { field: "platform", value: user.platform }];
            })
        } catch (e) {
            alert("Cannot get user info because: " + e.message);
            navigate(`/`);
        }
    }
    function handleToUpdate(e) {
        e.preventDefault();
        navigate(`/${user.uid}/update`);
    }
    async function handleLogout(e) {
        e.preventDefault();
        setError("");
        try {
            await logout();
            dispatch(emptyAccount());
            navigate(`/`);
        } catch (e) {
            setError("Cannot log out because: " + e.message);
        }
    }
    return (
        <div id="Account-whole" style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            <Card className="card-container" style={{ width: '550px' }}>
                <Card.Body>
                    <h1 className="text-center">Profile</h1>
                    <ListGroup variant="flush">
                        {userInfo.map((field, index) => {
                            if (Array.isArray(field.value)) {
                                return <ListGroup.Item className="m-2" key={index}>
                                    <Card.Subtitle className="mb-3 text-muted">{field.field}</Card.Subtitle>
                                    <ProfileField value={field.value} />
                                </ListGroup.Item>
                            } else {
                                return <ListGroup.Item className="m-2" key={index}>
                                    <Card.Subtitle className="mb-3 text-muted">{field.field}: {field.value}</Card.Subtitle>
                                </ListGroup.Item>
                            }
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
            {masterView ? (<div className="text-center">
                <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>) : (<div />)}
        </div>
    );
}