import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { removeMatch } from '../redux/matchingReducers/matchingReducer';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import './MatchingPage.css';
import Select from "react-select";

export default function MatchingPage() {
  const dispatch = useDispatch();
  const accountsJSON = useSelector((state) => state.matchingAccounts.accounts);
  const { currentUser } = useAuth();
  useEffect(() => {
      if (currentUser) {
         dispatch(getAccountAsync(currentUser.uid));
      }
  }, [currentUser]);
  const [genderOptions, setGenderOptions] = useState([]);

  // initialize a HashMap to handle timezone offset
  const timeZoneValues = [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const timeZoneOptions = ["Baker Island", "Jarvis Island", "Honolulu", "Anchorage, Alaska",
                           "Los Angeles, Vancouver, Tijuana", "Denver, Edmonton, Ciudad Juárez", "Mexico City, Chicago",
                           "New York, Toronto, Havana", "Santiago, Santo Domingo, Halifax",
                           "São Paulo, Argentina", "South Georgia and the South Sandwich Islands",
                           "Azores islands", "London, Dublin, Lisbon", "Berlin, Rome, Paris",
                           "Cairo, Johannesburg, Khartoum, Kyiv", " Moscow, Istanbul", "Dubai, Baku", "Karachi, Tashkent", "Dhaka, Almaty, Omsk",
                           "Ho Chi Minh City, Bangkok", "Shanghai, Singapore", "Tokyo, Seoul", "Sydney", "Nouméa",
                           "Auckland, Suva"];

  let timeZoneMap = new Map();
  for (let i = 0; i < timeZoneOptions.length; i++) {
      timeZoneMap.set(timeZoneOptions[i], timeZoneValues[i]);
  }

const handleDelete = (id) => {
    dispatch(removeMatch(id))
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const time = form.elements["time"].checked;
    const games = form.elements["game"].checked;
    const language = form.elements["language"].checked;
    if (time) findTimeMatching();
    if (games) findGameMatching();
    if (language) findLanguageMatching();
    if (genderOptions) findGenderMatching();
}
// Get the current user's timezone offset
function getUserOffset() {
    const userTimeZone = currentUser.profile["time-zone"];
    const userOffset = timeZoneMap.get(userTimeZone);
    return userOffset;
}

const playTimeSlots = ["Morning (6am-12pm)", "Afternoon(12pm-7pm)", "Evening(7pm-12am)", "Midnight(12am-6am)"];
const slotStartEndTimes = [[6, 12], [12, 19], [19, 24], [0, 6]];

function getOriginalTimes() {
    const time = [];
    const userPlaytime = currentUser.profile["play-time"];
    for (let i = 0; i < playTimeSlots.length; i++) {
        if (userPlaytime.includes(playTimeSlots[i])) {
            time.push(slotStartEndTimes[i]);
        }
    }
    return time;
}

// Calculate the UTC start and end times for each play time slot for a user
function convertTimes() {
    const originalTimes = getOriginalTimes();
    const userOffset = getUserOffset();

    // Convert the local start and end times to uniformed time zones
    const uniformedTimes = originalTimes.map(([startTime, endTime]) => [(startTime - userOffset + 24) % 24, (endTime - userOffset + 24) % 24]);
}


function findTimeMatching() {
    // we convert starting times to a universal standard
    const userOffset = getUserOffset();
    // TODO: how to get other information
}

function findGameMatching() {
    // TODO: how to get other information
}

function findLanguageMatching() {
    // TODO: how to get other information
}

function findGenderMatching() {
    // TODO: how to get other information
}

return (
    <div className="container">
         <div className="selection">
              {createCheckers()}
              <div style={{ padding: '10px 0' }} />
              {AnimatedMulti()}
              <div style={{ padding: '10px 0' }} />
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

function createCheckers() {
  return (
    <Form>
        <div>
          <Form.Check
            name="time"
            type={'checkbox'}
            label={`Play in same time`}
          />
        </div>
        <div>
          <Form.Check
            name="game"
            type={'checkbox'}
            label={`Play same game(s)`}
          />
        </div>
        <div>
          <Form.Check
            name="language"
            type={'checkbox'}
            label={`Speak same language`}
          />
        </div>
    </Form>
  );
}


function AnimatedMulti() {
    const selectorGenderOptions = [
        {value: "he", label: "He/Him"},
        {value: "she", label: "She/Her"},
        {value: "they", label: "They/Them"},
        {value: "ze", label: "Ze/Hir"},
        {value: "xe", label: "Xe/Xem"},
        {value: "o", label: "Other"}
    ];
    return (
        <Select
            closeMenuOnSelect={false}
            isMulti
            options={selectorGenderOptions}
            onChange={setGenderOptions}
        />
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

//// Check if two time ranges overlap
//function rangesOverlap(start1, end1, start2, end2) {
//    if (start1 < end1 && start2 < end2) {
//        // Both ranges are within the same day
//        return start1 < end2 && start2 < end1;
//    } else if (start1 >= end1 && start2 >= end2) {
//        // Both ranges span across two days
//        return true;
//    } else if (start1 >= end1 && start2 < end2) {
//        // First range spans across two days, second range is within the same day
//        return start2 < end1 || start1 < end2;
//    } else {
//        // Second range spans across two days, first range is within the same day
//        return start1 < end2 || start2 < end1;
//    }
//}
}