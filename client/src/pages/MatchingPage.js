import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import {getAccountAsync} from "../redux/accountReducers/accountThunks";
import './MatchingPage.css';
import Select from "react-select";
import user_img from "../redux/default_user.png";

export default function MatchingPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.account.currentUser);
  const { currentUser } = useAuth();
  const [genderOptions, setGenderOptions] = useState([]);
  const [matchings, setMatchings] = useState([]);
  const [change, setChange] = useState(0);

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
    fetch(`http://localhost:5000/users/${user.uid}/matching`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then((data) => {
        setMatchings(data);
    }).catch((error) => {
        console.error(error);
    });
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

    function handleApprove(e, _id) {
        e.preventDefault();
        const acc = {type: "accept", _id: _id};
        fetch(`http://localhost:5000/users/${user.uid}/requests`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(acc)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            setChange(Math.random());
            // setShowAlert({
            //     show: true,
            //     variant: "success",
            //     message: data
            //
            // });
        }).catch((error) => {
            // setShowAlert({
            //     show: true,
            //     variant: "danger",
            //     message: error.message
            //
            // });
        });
    }

    function handleSend(e, uid) {
        e.preventDefault();
        const acc = {type: "send", _id: user._id};
        fetch(`http://localhost:5000/users/${uid}/requests`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(acc)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            setChange(Math.random());
            // setShowAlert({
            //     show: true,
            //     variant: "success",
            //     message: data
            //
            // });
        }).catch((error) => {
            // setShowAlert({
            //     show: true,
            //     variant: "danger",
            //     message: error.message
            //
            // });
        });
    }

    function handleIgnore(e, _id) {
        e.preventDefault();
    }

return (
    <div className="container">
         <div className="selection">
             <Form onSubmit={(e) => handleSubmit(e)}>
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
                 <div style={{ padding: '10px 0' }} />
                 {AnimatedMulti()}
                 <div style={{ padding: '10px 0' }} />
                 <Button variant="primary" type="submit">Apply Filters</Button>
             </Form>
         </div>
         <div className="cards">
              {matchings.length === 0?
                  <h1 style={{ marginBottom: '100px' }}>No matching for you, sorry</h1>:
                  matchings.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px', maxHeight: '350px' }}>
                          <Card.Img variant="top" src={user_img} style={{width: '250px', height: '250px'}}/>
                          <Card.Body>
                              <Card.Title className="text-center">{request.account_name}</Card.Title>
                              <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                                  {request.requested?
                                      <Button variant="primary" onClick={(e) => handleApprove(e,request._id)}>
                                          Add As Friend
                                      </Button> :
                                      <Button variant="primary" onClick={(e) => handleSend(e,request.uid)}>
                                          Send Friend Request
                                      </Button>
                                  }
                                  {/*<Button variant="secondary" onClick={(e) => handleIgnore(e,request._id)}>*/}
                                  {/*    Ignore*/}
                                  {/*</Button>*/}
                              </div>
                          </Card.Body>
                      </Card>))}
         </div>
    </div>
);

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