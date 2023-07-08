import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ProfileField } from '../components/ProfileField';

const gameList = [{ "title": "Minecraft", "url": "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "title": "PUBG: Battlegrounds", "url": "https://upload.wikimedia.org/wikipedia/en/9/9f/Pubgbattlegrounds.png", "platform": ["Phone", "PC", "PS", "XBOX"] },
{ "title": "Mario Kart 8 / Deluxe", "url": "https://upload.wikimedia.org/wikipedia/en/b/b5/MarioKart8Boxart.jpg", "platform": ["NS"] },
{ "title": "Overwatch 2", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Overwatch_2_full_logo.svg/330px-Overwatch_2_full_logo.svg.png", "platform": ["PC", "PS", "XBOX", "NS"] },
{ "title": "Animal Crossing: New Horizons", "url": "https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg", "platform": ["NS"] },
{ "title": "Apex Legends", "url": "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg", "platform": ["Phone", "PC", "PS", "XBOX", "NS"] }];
// please add more, please

function GameSelector() {
    return (
        <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '80px' }}>
            <p>for now: just a list of games displayed, nothing you can do with this page</p>
            <Row xs={1} md={3} className="g-4" style={{ width: '900px' }}>
                {gameList.map((game, idx) => (
                    <Col key={idx}>
                        <Card key={game.title} style={{ width: '250px', height: '350px' }}>
                            <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                                <img src={game.url} style={{ width: '100%' }}></img>
                            </div>
                            <Card.Body>
                                <Card.Title>{game.title}</Card.Title>
                                <ProfileField value={game.platform} style={{ width: '250px'}}/>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default GameSelector;