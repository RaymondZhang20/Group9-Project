import React from 'react';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function AddGame() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const platform = ["Phone", "PC", "PS", "XBOX", "NS", "Other"];

    async function handleAddGame(e) {
        e.preventDefault();
        const form = e.target;
        try {
            const newGame = {
                title: form.elements['title'].value,
                platform: Array.from(form.elements['platform'])
                    .filter(input => input.checked)
                    .map(input => input.value),
                url: form.elements['url'].value
            };
            console.log(newGame);
            const response = await fetch('http://localhost:5000/games/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame)
            });
            if (!response.ok) {
                throw new Error('Failed to add game.');
            }
            const data = await response.json();
            alert("Added Successfully!");
            if (currentUser) {
                navigate(`/${currentUser.uid}/game`);
            } else {
                window.location.reload(false);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add game.");
            window.location.reload(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            <Container className="align-items-center justify-content-center d-flex" >
                <Card style={{ width: '500px' , paddingTop: '30px', paddingLeft: '20px'}}>
                    <Card.Title>Add A New Game To Our Game List!</Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleAddGame}>
                            <Form.Group id="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Title" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="platform">
                                <Form.Label>Platform</Form.Label>
                                {platform.map((option) => {
                                    return (<Form.Check id={option} name="platform" type="checkbox" label={option} value={option} />);
                                })}
                            </Form.Group>
                            <Form.Group id="url">
                                <Form.Label>Displayed Image</Form.Label>
                                <Form.Control name="url" type="text" placeholder="Image URL" required />
                            </Form.Group>
                            <div className="text-center">
                                <Button className="w-75 mt-3" type="submit">Add Game</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}