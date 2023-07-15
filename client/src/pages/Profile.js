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

const gameList = [{ "id": "64ab23e5c83ed8d6a2bada24", "title": "Minecraft", "url": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "id": "64afe142da7f0f37da363ae9", "title": "PUBG: Battlegrounds", "url": "https://upload.wikimedia.org/wikipedia/en/9/9f/Pubgbattlegrounds.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "id": "64afe17cda7f0f37da363aea", "title": "Mario Kart 8 / Deluxe", "url": "https://upload.wikimedia.org/wikipedia/en/b/b5/MarioKart8Boxart.jpg", "platform": ["NS"] },
{ "id": "64afe18dda7f0f37da363aeb", "title": "Overwatch 2", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Overwatch_2_full_logo.svg/330px-Overwatch_2_full_logo.svg.png", "platform": ["PC", "PS", "XBOX", "NS"] },
{ "id": "64afe1e4da7f0f37da363aec", "title": "Animal Crossing: New Horizons", "url": "https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg", "platform": ["NS"] },
{ "id": "64afe1f5da7f0f37da363aed", "title": "Apex Legends", "url": "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg", "platform": ["Phone", "PC", "PS", "XBOX", "NS"] }];

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
    let userInfo = [];
    let games = [];
    // console.log(user);
    if (user.uid) {
        userInfo =
        [{ field: "account Name", value: user.account_name },
        { field: "first", value: user.profile.first_name },
        { field: "last", value: user.profile.last_name },
        { field: "timezone", value: user.profile.time_zone },
        { field: "location", value: user.profile.location },
        { field: "pronoun", value: user.profile.pronoun },
        { field: "time", value: user.profile.play_time },
        { field: "language", value: user.profile.language },
        { field: "platform", value: user.profile.platform }];
        games = gameList.filter(game => user.games.includes(game.id));
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
    if (user.uid) {
        return (
            <div id="Account-whole" style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            <div id="profile" style={{ display: 'flex',paddingTop: '40px' }}>
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
                <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '80px', paddingLeft: '80px' }}>
                    <Row xs={1} md={3} className="g-4" style={{ maxWidth: '600px', maxHeight: '250px' }}>
                        {games.map((game, idx) => (<Col key={idx}>
                            <Card key={game.title} style={{ maxWidth: '160px', maxHeight: '230px', minHeight:'100%' }}>
                                <div style={{ width: '100%', maxHeight: '160px', overflow: 'hidden'}}>
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
            <div className="text-center" style={{ paddingTop: '40px'}}>
                <Button className="w-75 mt-3" onClick={handleToUpdate}>Update My Info</Button>
                <Button className="w-75 mt-3" onClick={handleSelectGame}>Select Games</Button>
                <Button className="w-75 mt-3" onClick={handleLogout}>LogOut</Button>
            </div>
        </div>
        );
    } else {
        return (<p>Loading user informations...</p>);
    }
    
}