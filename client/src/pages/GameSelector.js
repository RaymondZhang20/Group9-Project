import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { ProfileField } from '../components/ProfileField';
import { useDispatch, useSelector } from "react-redux";
import { getAccountAsync, updateAccountAsync } from "../redux/accountReducers/accountThunks";

const gameList = [{ "title": "Minecraft", "url": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "title": "PUBG: Battlegrounds", "url": "https://upload.wikimedia.org/wikipedia/en/9/9f/Pubgbattlegrounds.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "title": "Mario Kart 8 / Deluxe", "url": "https://upload.wikimedia.org/wikipedia/en/b/b5/MarioKart8Boxart.jpg", "platform": ["NS"] },
{ "title": "Overwatch 2", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Overwatch_2_full_logo.svg/330px-Overwatch_2_full_logo.svg.png", "platform": ["PC", "PS", "XBOX", "NS"] },
{ "title": "Animal Crossing: New Horizons", "url": "https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg", "platform": ["NS"] },
{ "title": "Apex Legends", "url": "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg", "platform": ["Phone", "PC", "PS", "XBOX", "NS"] }];
// please add more, please


function GameSelector() {
    const [selectedGame, setSelectedGame] = useState([]);

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.account.currentUser);
    const initSelect = userInfo.game;
    setSelectedGame(initSelect);
    const uid = currentUser.uid;

    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);

    const handleUpdate = () => {
        const updatedUserInfo = { ...userInfo };
        updatedUserInfo.game = selectedGame;
        try {
            dispatch(updateAccountAsync(updatedUserInfo));
            alert("Updated Successfully!");
            window.location.href = './profile';
        } catch (e) {
            alert("Failed to update user information.");
            // setError("Cannot update profile: " + e.message);
        }
    }

    const handleBack = () => {
        navigate(`/${uid}/profile`);
    }

    const handleSelect = (g) => {
        const index = selectedGame.findIndex(game => game === g);
        if (index == -1) {
            const newSelect = [...selectedGame];
            newSelect.push(g);
            setSelectedGame(newSelect);
        } else {
            const newSelect = [...selectedGame];
            newSelect.splice(index, 1)
            setSelectedGame(newSelect);
        }
    }

    const setBorder = (g) => (
        selectedGame.includes(g) ? "primary" : "light"
    )

    return (
        <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '80px' }}>
            <p>Select games you have played below!</p>
            <Row xs={1} md={3} className="g-4" style={{ width: '900px' }}>
                {gameList.map((game, idx) => (<Col key={idx}>
                    <Card key={game.title} border={setBorder(game.title)} onClick={() => handleSelect(game.title)} style={{ width: '250px', height: '350px' }}>
                        <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                            <img src={game.url} style={{ width: '100%' }}></img>
                        </div>
                        <Card.Body>
                            <Card.Title>{game.title}</Card.Title>
                            <ProfileField value={game.platform} style={{ width: '250px' }} />
                        </Card.Body>
                    </Card>
                </Col>))}
            </Row>
            <div className="text-center">
                <Button className="w-75 mt-3" onClick={handleUpdate}>Update</Button>
                <Button className="w-75 mt-3" onClick={handleBack}>Back</Button>
            </div>
        </div>
    );
}

export default GameSelector;