import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

// Add call to back end when matching algorithm is decided on
var accounts = [
    {
      "email": "zhangxueyong2019@163.com",
      "uid": "K5G3uLk1Bub5bBwnwejZrEHNGIs2",
      "first_name": "XueYong",
      "last_name": "Zhang",
      "time_zone": null,
      "location": null,
      "pronoun": 1,
      "play_time": [1,2,3],
      "language": [1],
      "platform": [1,2,4,5]
    },
    {
      "email": "opkisky@gmail.com",
      "uid": "f5oaJV5FuSZViDZ12new9hwvw842",
      "first_name": "sss",
      "last_name": "zxx",
      "time_zone": null,
      "location": null,
      "pronoun": 1,
      "play_time": [1,2,3],
      "language": [1],
      "platform": [1,2,4,5]
    },
    {
      "email": "shawn01zhu@gmail.com",
      "uid": "RVKoP27ociPlYYVLq86aTEiymUW2",
      "first_name": "sss",
      "last_name": "zxx",
      "time_zone": null,
      "location": null,
      "pronoun": 1,
      "play_time": [1,2,3],
      "language": [1],
      "platform": [1,2,4,5]
    },
    {
      "email": "jasperhuang@hotmail.com",
      "uid": "GoTpCIvVrAM5VQgH5JK6ddPcZRp1",
      "first_name": "sss",
      "last_name": "zxx",
      "time_zone": null,
      "location": null,
      "pronoun": 1,
      "play_time": [1,2,3],
      "language": [1],
      "platform": [1,2,4,5]
    },
    {
      "email": "dorothy.unicorn@gmail.com",
      "uid": "eUaiHoqEwcTIkZg9ZyHFkSQ9Xd22",
      "first_name": "sss",
      "last_name": "zxx",
      "time_zone": null,
      "location": null,
      "pronoun": 1,
      "play_time": [1,2,3],
      "language": [1],
      "platform": [1,2,4,5]
    }
  ];

export default function MatchingPage() {

    return (
        <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            {accounts.map((data) => (
                <div>
                {createCard(data)}
                </div>
            ))}
        </div>
    );
}

function createCard(account) {
    return (
    <Card style={{ width: '60rem'}}>
        <Card.Body>
            <Card.Title>{account.first_name} {account.last_name}</Card.Title>
            <Card.Text>
            {account.pronoun}
            </Card.Text>
            <Card.Text>
            {account.time_zone}
            </Card.Text>
            <Card.Text>
            {account.platform}
            </Card.Text>
            <Card.Text>
            {account.play_time}
            </Card.Text>
            <Card.Text>
            {account.platform}
            </Card.Text>
            <Card.Text>
            {account.language}
            </Card.Text>
            <Button>Match</Button>
        </Card.Body>
    </Card>
    )
}