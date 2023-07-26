import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { ProfileField } from '../components/ProfileField';
import { useDispatch, useSelector } from "react-redux";
import { updateAccountAsync } from "../redux/accountReducers/accountThunks";


function GameSelector() {
    const [games, setgames] = useState([]);
    const { logout, currentUser } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.account.currentUser);
    const initSelect = userInfo.games;
    const [selectedGame, setSelectedGame] = useState(initSelect);
    const uid = currentUser.uid;

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
    }, []);


    const handleUpdate = () => {
        const updatedUserInfo = { ...userInfo };
        updatedUserInfo.games = selectedGame;
        try {
            dispatch(updateAccountAsync(updatedUserInfo));
            alert("Updated Successfully!");
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

    if (userInfo.uid && games !== []) {
        return (
            <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '80px' }}>
                <p>Select games you have played below!</p>
                <Row xs={1} md={3} className="g-4" style={{ width: '900px' }}>
                    {games.map((game, idx) => (<Col key={idx}>
                        <Card key={game.title} border={setBorder(game.id)} onClick={() => handleSelect(game.id)} style={{ width: '250px', height: '350px' }}>
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
    } else {
        return (<p>Loading user informations...</p>);
    }
}

export default GameSelector;