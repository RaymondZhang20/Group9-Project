import { Button, Card, ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useDeferredValue, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useRouteError } from "react-router-dom"
import { getAccountAsync } from "../redux/accountReducers/accountThunks";
import { useDispatch, useSelector } from "react-redux";
import { emptyAccount } from "../redux/accountReducers/accountReducer";
import { ProfileField } from '../components/ProfileField';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Avatar from '../components/Avatar';

export default function Profile() {
    const location = useLocation();
    const { logout, currentUser } = useAuth();
    const [games, setgames] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:5000/games/');
                if (!response.ok) {
                    throw new Error('Failed to get list of games.');
                }
                const data = await response.json();
                setgames(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
    const user = useSelector(state => state.account.currentUser);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const uid = currentUser.uid;
    let userInfo = [];
    let userGames = [];
    let userAvatar = "";
    if (location.state !== null && games !== []) {
        userInfo =
            [{ field: "account Name", value: location.state.account_name ? location.state.account_name : "" },
            { field: "first", value: location.state.profile ? location.state.profile.first_name : "" },
            { field: "last", value: location.state.profile ? location.state.profile.last_name : "" },
            { field: "timezone", value: location.state.profile ? location.state.profile.time_zone : "" },
            { field: "location", value: location.state.profile ? location.state.profile.location : "" },
            { field: "pronoun", value: location.state.profile ? location.state.profile.pronoun : "" },
            { field: "time", value: location.state.profile ? location.state.profile.play_time : "" },
            { field: "language", value: location.state.profile ? location.state.profile.language : "" },
            { field: "platform", value: location.state.profile ? location.state.profile.platform : "" }];
        userGames = games.filter(game => location.state.games.includes(game['_id']));
        userAvatar = location.state.avatar ? location.state.avatar : "dafault_user";
    } else {
        if (user.uid && games !== []) {
            userInfo =
                [{ field: "account Name", value: user.account_name ? user.account_name : "" },
                { field: "first", value: user.profile ? user.profile.first_name : "" },
                { field: "last", value: user.profile ? user.profile.last_name : "" },
                { field: "timezone", value: user.profile ? user.profile.time_zone : "" },
                { field: "location", value: user.profile ? user.profile.location : "" },
                { field: "pronoun", value: user.profile ? user.profile.pronoun : "" },
                { field: "time", value: user.profile ? user.profile.play_time : "" },
                { field: "language", value: user.profile ? user.profile.language : "" },
                { field: "platform", value: user.profile ? user.profile.platform : "" }];
            userGames = games.filter(game => user.games.includes(game['_id']));
            userAvatar = user.avatar ? user.avatar : "dafault_user";
        }
    }

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

    function handleBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    if (user.uid && games !== []) {
        return (
            <div id="Account-whole" style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
                <div id="profile" style={{ display: 'flex', paddingTop: '40px' }}>
                    <Card className="card-container" style={{ width: '550px' }}>
                        <Card.Body>
                            <center><Avatar avatar={userAvatar} className="rounded-circle" variant="top" style={{ width: '200px', height: '200px', margin: '20px', boxShadow: '0 1px 5px rgba(0,0,0,0.2)' }} /></center>
                            <ListGroup variant="flush">
                                {userInfo.map((field, index) => {
                                    if (field.value && Array.isArray(field.value)) {
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
                    <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '80px', paddingLeft: '80px' }}>
                        <Row xs={1} md={3} className="g-4" style={{ maxWidth: '600px', maxHeight: '250px' }}>
                            {userGames.map((game, idx) => (<Col key={idx}>
                                <Card key={game.title} style={{ maxWidth: '160px', maxHeight: '230px', minHeight: '100%' }}>
                                    <div style={{ width: '100%', maxHeight: '160px', overflow: 'hidden' }}>
                                        <img src={game.url} style={{ width: '100%' }}></img>
                                    </div>
                                    <Card.Body>
                                        <Card.Subtitle>{game.title}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>))}
                        </Row>
                    </div>
                </div>
                <div className="text-center" style={{ paddingTop: '40px' }}>
                    {location.state === null ?
                        <div>
                            <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                            <Button className="w-75 mt-3" onClick={handleSelectGame}>Select Games</Button>
                            <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
                        </div> :
                        <Button className="w-75 mt-3" onClick={handleBack}>Back</Button>
                    }
                </div>
            </div>
        );
    } else {
        return (<p>Loading user informations...</p>);
    }

}