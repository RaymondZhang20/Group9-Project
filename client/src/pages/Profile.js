import {Button, Card, ListGroup} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {useDeferredValue, useEffect, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import {useDispatch, useSelector} from "react-redux";
import {emptyAccount} from "../redux/accountReducers/accountReducer";
import {ProfileField} from '../components/ProfileField';

export default function Profile() {
    const {logout, currentUser} = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
    const user = useSelector(state => state.account.currentUser);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const uid = currentUser.uid;
    const userInfo = 
    [{field: "account Name", value: user.account_name},
    {field: "first", value: user.profile.first_name},
    {field: "last", value: user.profile.last_name},
    {field: "timezone", value: user.profile.time_zone},
    {field: "location", value: user.profile.location},
    {field: "pronoun", value: user.profile.pronoun},
    {field: "time", value: user.profile.play_time},
    {field: "language", value: user.profile.language},
    {field: "platform", value: user.profile.platform}];

    function handleToUpdate(e) {
        e.preventDefault();
        navigate(`/${uid}/update`);
    }
    function handleSelectGame(e) {
        e.preventDefault();
        navigate(`/${uid}/game`);
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
                                    <ProfileField value={field.value}/>
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
            <div className="text-center">
                <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                <Button className="w-75 mt-3" onClick={handleSelectGame}>Select Games</Button>
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>
        </div>
    );
}