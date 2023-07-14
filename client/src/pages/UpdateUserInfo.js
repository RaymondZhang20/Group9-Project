import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {useDispatch, useSelector} from "react-redux";
import {getAccountAsync, updateAccountAsync} from "../redux/accountReducers/accountThunks";

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

function UpdateUserInfo() {
  const { currentUser } = useAuth();
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
      }
    };
    // Send the updated user information to the server
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
              <Form.Control name="first-name" type="text" placeholder="Enter First Name" defaultValue={userInfo.profile.first_name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last-name" type="text" placeholder="Enter Last Name" defaultValue={userInfo.profile.last_name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTimeZone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control name = "time-zone" as="select" defaultValue={userInfo.profile.time_zone} >
                <option disabled={true}>Select time zone</option>
                {profileOption["time-zone"].map((option) => {return (<option>{option}</option>);})}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" type="text" placeholder="Allow location access by clicking the button below" defaultValue={userInfo.profile.location} readOnly/>
              <Button onClick={getLocation}>Get Location</Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPronouns">
              <Form.Label>Pronoun</Form.Label>
              <Form.Control name="pronoun" as="select" defaultValue={userInfo.profile.pronoun}>
                <option disabled={true}>Select pronouns</option>
                {profileOption["pronoun"].map((option) => {return (<option>{option}</option>);})}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlayingTime">
              <Form.Label>Prefer playing time</Form.Label>
              {profileOption["play-time"].map((option) => {
                return (<Form.Check name="play-time" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile.play_time.includes(option)}/>);})}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language spoken</Form.Label>
              {profileOption["language"].map((option) => {
                return (<Form.Check name="language" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile.language.includes(option)}/>);})}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlatform">
              <Form.Label>Platform</Form.Label>
              {profileOption["platform"].map((option) => {
                return (<Form.Check name="platform" type="checkbox" label={option} value={option} defaultChecked={userInfo.profile.platform.includes(option)}/>);})}
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
