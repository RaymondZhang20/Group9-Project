import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import { removeMatch } from '../redux/matchingReducers/matchingReducer';
import { useSelector, useDispatch } from 'react-redux';
import './MatchingPage.css';
import Select from "react-select";

export default function MatchingPage() {
  const dispatch = useDispatch();
  const accountsJSON = useSelector((state) => state.matchingAccounts.accounts);

const profileOption = {
  "time-zone" : ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00",
   "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00",
   "UTC-03:00", "UTC-02:00", "UTC-01:00", "UTC+00:00", "UTC+01:00",
   "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00",
   "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00",
   "UTC+12:00"],
   "pronoun" : ["He/Him", "She/Her", "They/Them", "Ze/Hir", "Xe/Xem", "Other"],
   "play-time" : ["Morning (6am-12pm)", "Afternoon(12pm-7pm)", "Evening(7pm-12am)", "Midnight(12am-6am)"],
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
         <div className="selection">
              {createCheckers("Language Spoken", "language")}
              <div style={{ padding: '10px 0' }} />
              {createCheckers("Platform", "platform")}
              <div style={{ padding: '10px 0' }} />
              {createCheckers("Play Time", "play-time")}
              <div style={{ padding: '10px 0' }} />
              {createCheckers("Pronoun", "pronoun")}
              <div style={{ padding: '10px 0' }} />
             <Dropdown placeHolder="Select..." options={testOptions} />
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

function createCheckers(title, opt) {
    return (
        <div>
            <span>{title}:</span>
            {profileOption[opt].map((option) => {
                return (
                    <div key={option}>
                        <input
                            name={opt}
                            type="checkbox"
                            id={`${opt}-${option}`}
                            value={option}
                        />
                        <label htmlFor={`${opt}-${option}`}>{option}</label>
                    </div>
                );
            })}
        </div>
    );
}

function genderMultiSelect() {
  const genderOptions = [
    {value: "he", label: "He/Him"},
    {value: "she", label: "She/Her"},
    {value: "they", label: "They/Them"},
    {value: "ze", label: "Ze/Hir"},
    {value: "xe", label: "Xe/Xem"},
    {value: "o", label: "Other"}
  ];
//  const colorStyles = {
//  }
//
//  const loadOptions = (searchValue, callback) {
//  }

  return <Select loadOptions={loadOptions} isMulti style = {colorStyles}>;
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