import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {useDispatch, useSelector} from "react-redux";
import {getAccountAsync, updateAccountAsync} from "../redux/accountReducers/accountThunks";
import Avatar from '../components/Avatar';

const profileOption = {
  "time-zone" :
  ["Baker Island", "Jarvis Island", "Honolulu", "Anchorage, Alaska",
   "Los Angeles, Vancouver, Tijuana", "Denver, Edmonton, Ciudad Juárez", "Mexico City, Chicago",
   "New York, Toronto, Havana", "Santiago, Santo Domingo, Halifax",
   "São Paulo, Argentina", "South Georgia and the South Sandwich Islands",
   "Azores islands", "London, Dublin, Lisbon", "Berlin, Rome, Paris",
   "Cairo, Johannesburg, Khartoum, Kyiv", " Moscow, Istanbul", "Dubai, Baku", "Karachi, Tashkent", "Dhaka, Almaty, Omsk",
   "Ho Chi Minh City, Bangkok", "Shanghai, Singapore", "Tokyo, Seoul", "Sydney", "Nouméa",
   "Auckland, Suva"],
   "pronoun" : ["He/Him", "She/Her", "They/Them", "Ze/Hir", "Xe/Xem", "Other"],
   "play-time" : ["Morning (6am-12pm)", "Afternoon(12pm-7pm)", "Evening(7pm-12am)", "Midnight(12am-6am)"],
   "language" : ["English", "Spanish", "French", "German", "Mandarin", "Cantonese",
   "Japanese", "Korean", "Italian", "Portuguese", "Russian", "Arabic", "Hindi",
   "Bengali", "Dutch", "Swedish", "Other"],
   "platform" : ["Phone", "PC", "PS", "XBOX", "NS", "Other"],
   "avatar" : ["apex", "cod", "mario", "minecraft", "overwatch"]
};

function UpdateUserInfo() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
      if (currentUser) {
         dispatch(getAccountAsync(currentUser.uid));
      }
  }, [currentUser]);
  const userInfo = useSelector(state => state.account.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the updated user information from the form
    const form = e.target;
    const locationString = form.elements['location'].value;
    let latitude = null, longitude = null;
    if (locationString) {
      [latitude, longitude] = locationString
          .split(',')
          .map((coord) => coord.split(':')[1].trim());
    }
    const updatedUserInfo = {
      uid: currentUser.uid,
      account_name: form.elements['account-name'].value,
      profile: {
        first_name: form.elements['first-name'].value,
        last_name: form.elements['last-name'].value,
        time_zone: form.elements['time-zone'].value,
        location: form.elements['location'].value,
        pronoun: form.elements['pronoun'].value,
        play_time: Array.from(form.elements['play-time'])
          .filter(input => input.checked)
          .map(input => input.value),
        language: Array.from(form.elements['language'])
          .filter(input => input.checked)
          .map(input => input.value),
        platform: Array.from(form.elements['platform'])
          .filter(input => input.checked)
          .map(input => input.value),
        standard_time: translateToStandard(form.elements['time-zone'].value,
        Array.from(form.elements['play-time']).filter(input => input.checked).map(input => input.value))
      },
      geolocation: { lat: latitude, long: longitude },
      avatar: form.elements['avatar'].value
    };

    try {
      dispatch(updateAccountAsync(updatedUserInfo));
      alert("Updated Successfully!");
      window.location.href = './profile';
    } catch (e) {
      alert("Failed to update user information.");
    }  
  };

    function getLocation() {
      if (navigator.geolocation) {
        // setsTime(translateToStandard(userInfo));
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      const locationField = document.querySelector('input[name="location"]');
      locationField.value = "Latitude: " + position.coords.latitude +
      ", Longitude: " + position.coords.longitude;
    }

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

  // Get the current user's timezone offset
  function getUserOffset(timezone) {
    const userOffset = timeZoneMap.get(timezone);
    return userOffset;
  }

  function translateToStandard(timezone, playtime) {
      let numPlayTime = [];
          if (playtime.includes("Morning (6am-12pm)")) {
              numPlayTime.push(6,7,8,9,10,11);
          }
          if (playtime.includes("Afternoon(12pm-7pm)")) {
              numPlayTime.push(12,13,14,15,16,17,18);
          }
          if (playtime.includes("Evening(7pm-12am)")) {
              numPlayTime.push(19,20,21,22,23);
          }
          if (playtime.includes("Midnight(12am-6am)")) {
              numPlayTime.push(0,1,2,3,4,5);
          }
      console.log(numPlayTime);
      let standardTime = [];
      const offset = getUserOffset(timezone);
      console.log(offset);
      for (let i = 0; i < numPlayTime.length; i++) {
          standardTime[i] = (numPlayTime[i] + offset)%24;
      }
      console.log(standardTime);
      return standardTime;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
      <Card className="card-container" style={{ width: '550px' }}>
        <Card.Body>
          <Card.Title>Update Info</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Text className="text-muted">
                          We'll never share your information with anyone else.
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Account Name</Form.Label>
              <Form.Control name="account-name" type="text" placeholder="Enter Account Name" defaultValue={userInfo.account_name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first-name" type="text" placeholder="Enter First Name" defaultValue={userInfo.profile?userInfo.profile.first_name:""} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last-name" type="text" placeholder="Enter Last Name" defaultValue={userInfo.profile?userInfo.profile.last_name:""} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTimeZone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control name = "time-zone" as="select" defaultValue={userInfo.profile?userInfo.profile.time_zone:"Select time zone"} >
                <option disabled={true}>Select time zone</option>
                {profileOption["time-zone"].map((option) => {return (<option>{option}</option>);})}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" type="text" placeholder="Allow location access by clicking the button below" defaultValue={userInfo.profile?userInfo.profile.location:""} readOnly/>
              <Button onClick={getLocation}>Get Location</Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPronouns">
              <Form.Label>Pronoun</Form.Label>
              <Form.Control name="pronoun" as="select" defaultValue={userInfo.profile?userInfo.profile.pronoun:"Select pronouns"}>
                <option disabled={true}>Select pronouns</option>
                {profileOption["pronoun"].map((option) => {return (<option>{option}</option>);})}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlayingTime">
              <Form.Label>Prefer playing time</Form.Label>
              {profileOption["play-time"].map((option) => {
                return (<Form.Check name="play-time" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile?userInfo.profile.play_time.includes(option):false}/>);})}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language spoken</Form.Label>
              {profileOption["language"].map((option) => {
                return (<Form.Check name="language" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile?userInfo.profile.language.includes(option):false}/>);})}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlatform">
              <Form.Label>Platform</Form.Label>
              {profileOption["platform"].map((option) => {
                return (<Form.Check name="platform" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile?userInfo.profile.platform.includes(option):false}/>);})}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label>Avatar</Form.Label>
              {profileOption["avatar"].map((option) => {
                return (
                <div>
                  <Form.Check inline name="avatar" type="radio" value={option} aria-label={option} defaultChecked={userInfo?userInfo.avatar === option:false}/>
                  <Avatar avatar={option} variant="top" style={{ width: '100px', height: '100px', margin: '20px', boxShadow: '0 1px 5px rgba(0,0,0,0.2)' }} />
                  </div>);})}
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UpdateUserInfo;
