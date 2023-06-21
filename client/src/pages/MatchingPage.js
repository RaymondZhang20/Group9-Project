import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { removeMatch } from '../redux/matchingReducers/matchingReducer';
import { useSelector, useDispatch } from 'react-redux';

export default function MatchingPage() {
  const dispatch = useDispatch();
  const accountsJSON = useSelector((state) => state.matchingAccounts.accounts);

  const handleDelete = (id) => {
    dispatch(removeMatch(id))
  }

    return (
        <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
            {accountsJSON.map((data) => (
                <div key = {JSON.parse(data).uid}>
                {createCard(data)}
                </div>
            ))}
        </div>
    );
    
    
function createCard(accountJSON) {
  const account = JSON.parse(accountJSON)
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
          <Button onClick={() => handleDelete(account.uid)}>Remove Match </Button>
          <Button>Match </Button>
      </Card.Body>
  </Card>
  )
}
}