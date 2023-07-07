import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { removeMatch } from '../redux/matchingReducers/matchingReducer';
import { useSelector, useDispatch } from 'react-redux';
import './MatchingPage.css';

export default function MatchingPage() {
  const dispatch = useDispatch();
  const accountsJSON = useSelector((state) => state.matchingAccounts.accounts);

// TODO: Calculate the play-time and calculate using that and the user's timezone to query

const profileOption = {
  "time-zone" : ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00",
   "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00",
   "UTC-03:00", "UTC-02:00", "UTC-01:00", "UTC+00:00", "UTC+01:00",
   "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00",
   "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
   "UTC+12:00"],
   "pronoun" : ["He/Him", "She/Her", "They/Them", "Ze/Hir", "Xe/Xem", "Other"],
   "play-time" : ["Morning", "Afternoon", "Evening"],
   "language" : ["English", "Spanish", "French", "German", "Mandarin", "Cantonese",
   "Japanese", "Korean", "Italian", "Portuguese", "Russian", "Arabic", "Hindi",
   "Bengali", "Dutch", "Swedish", "Other"],
   "platform" : ["Phone", "PC", "PS", "XBOX", "NS", "Other"]
};

  const handleDelete = (id) => {
    dispatch(removeMatch(id))
  }

  const handleSubmit = () => {
    // TODO
  }

  return (
    <div className="container">
      <div className="selection">  // TODO: fix the upper padding for selection
        {createLanguageCheckers()}
        <div style={{ padding: '10px 0' }} />
        {createPlatformCheckers()}
        <button type="submit">Apply Filters</button>
      </div>
      <div className="cards">
          {accountsJSON.map((data) => (
              <div key = {JSON.parse(data).uid}>
              {createCard(data)}
              </div>
          ))}
      </div>
    </div>
  );

function createLanguageCheckers() {
  return (
    <div>
      <span>Language spoken:</span>
      {profileOption["language"].map((option) => {
        return (
          <div key={option}>
            <input
              name="language"
              type="checkbox"
              id={`language-${option}`}
              value={option}
            />
            <label htmlFor={`language-${option}`}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}

function createPlatformCheckers() {
  return (
    <div>
      <span>Platform:</span>
      {profileOption["platform"].map((option) => {
        return (
          <div key={option}>
            <input
              name="platform"
              type="checkbox"
              id={`platform-${option}`}
              value={option}
            />
            <label htmlFor={`platform-${option}`}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}


function createCard(accountJSON) {
  const account = JSON.parse(accountJSON)
  return (
  <Card style={{ width: '200%' }}>
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