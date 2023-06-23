import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {useDispatch, useSelector} from "react-redux";
import {getAccountAsync, updateAccountAsync} from "../redux/accountReducers/accountThunks";

function UpdateUserInfo() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.account.currentUser);
  const uid = currentUser.uid;

  useEffect(() => {
    if (currentUser) {
        dispatch(getAccountAsync(currentUser.uid));
    }
}, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the updated user information from the form
    const form = e.target;
    const updatedUserInfo = {
      uid: uid,
      account_name: form.elements['account-name'].value,
      first_name: form.elements['first-name'].value,
      last_name: form.elements['last-name'].value,
      time_zone: form.elements['time-zone'].value,
      location: form.elements['location'].value,
      pronoun: form.elements['pronoun'].value,
      play_time: Array.from(form.elements['playing-time'])
        .filter(input => input.checked)
        .map(input => input.value),
      language: Array.from(form.elements['language'])
        .filter(input => input.checked)
        .map(input => input.value),
      platform: Array.from(form.elements['platform'])
        .filter(input => input.checked)
        .map(input => input.value),
    };
    // Send the updated user information to the server
    try {
      dispatch(updateAccountAsync(updatedUserInfo));
      alert("Updated Successfully!");
      window.location.href = './profile';
    } catch (e) {
      alert("Failed to update user information.");
      // setError("Cannot update profile: " + e.message);
      // not sure which way is better
    }  
  };



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
              <Form.Control name="first-name" type="text" placeholder="Enter First Name" defaultValue={userInfo.first_name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last-name" type="text" placeholder="Enter Last Name" defaultValue={userInfo.last_name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTimeZone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control name = "time-zone" type="text" placeholder="Enter time zone" defaultValue={userInfo.time_zone} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" type="text" placeholder="Enter location" defaultValue={userInfo.location} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPronouns">
              <Form.Label>Pronoun</Form.Label>
              <Form.Control name="pronoun" as="select" defaultValue={userInfo.pronoun}>
                <option>Select pronouns</option>
                <option>He/Him</option>
                <option>She/Her</option>
                <option>They/Them</option>
                <option>Ze/Hir</option>
                <option>Xe/Xem</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlayingTime">
              <Form.Label>Prefer playing time</Form.Label>
              <Form.Check name="playing-time" type="checkbox" label="Morning" value="Morning" defaultChecked={userInfo.play_time.includes("Morning")}/>
              <Form.Check name="playing-time" type="checkbox" label="Afternoon" value="Afternoon" defaultChecked={userInfo.play_time.includes("Afternoon")}/>
              <Form.Check name="playing-time" type="checkbox" label="Evening" value="Evening" defaultChecked={userInfo.play_time.includes("Evening")}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language spoken</Form.Label>
                  <Form.Check name="language" type="checkbox" label="English" value="English" defaultChecked={userInfo.language.includes("English")}/>
                  <Form.Check name="language" type="checkbox" label="Spanish" value="Spanish" defaultChecked={userInfo.language.includes("Spanish")}/>
                  <Form.Check name="language" type="checkbox" label="French" value="French" defaultChecked={userInfo.language.includes("French")}/>
                  <Form.Check name="language" type="checkbox" label="German" value="German" defaultChecked={userInfo.language.includes("German")}/>
                  <Form.Check name="language" type="checkbox" label="Mandarin" value="Mandarin" defaultChecked={userInfo.language.includes("Mandarin")}/>
                  <Form.Check name="language" type="checkbox" label="Cantonese" value="Cantonese" defaultChecked={userInfo.language.includes("Cantonese")}/>
                  <Form.Check name="language" type="checkbox" label="Japanese" value="Japanese" defaultChecked={userInfo.language.includes("Japanese")}/>
                  <Form.Check name="language" type="checkbox" label="Korean" value="Korean" defaultChecked={userInfo.language.includes("Korean")}/>
                  <Form.Check name="language" type="checkbox" label="Italian" value="Italian" defaultChecked={userInfo.language.includes("Italian")}/>
                  <Form.Check name="language" type="checkbox" label="Portuguese" value="Portuguese" defaultChecked={userInfo.language.includes("Portuguese")}/>
                  <Form.Check name="language" type="checkbox" label="Russian" value="Russian" defaultChecked={userInfo.language.includes("Russian")}/>
                  <Form.Check name="language" type="checkbox" label="Arabic" value="Arabic" defaultChecked={userInfo.language.includes("Arabic")}/>
                  <Form.Check name="language" type="checkbox" label="Hindi" value="Hindi" defaultChecked={userInfo.language.includes("Hindi")}/>
                  <Form.Check name="language" type="checkbox" label="Bengali" value="Bengali" defaultChecked={userInfo.language.includes("Bengali")}/>
                  <Form.Check name="language" type="checkbox" label="Dutch" value="Dutch" defaultChecked={userInfo.language.includes("Dutch")}/>
                  <Form.Check name="language" type="checkbox" label="Swedish" value="Swedish" defaultChecked={userInfo.language.includes("Swedish")}/>
                  <Form.Check name="language" type="checkbox" label="Other" value="Other" defaultChecked={userInfo.language.includes("Other")}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlatform">
              <Form.Label>Platform</Form.Label>
              <Form.Check name="platform" type="checkbox" label="Phone" value="Phone" defaultChecked={userInfo.platform.includes("Phone")}/>
              <Form.Check name="platform" type="checkbox" label="PC" value="PC" defaultChecked={userInfo.platform.includes("PC")}/>
              <Form.Check name="platform" type="checkbox" label="PS" value="PS" defaultChecked={userInfo.platform.includes("PS")}/>
              <Form.Check name="platform" type="checkbox" label="XBOX" value="XBOX" defaultChecked={userInfo.platform.includes("XBOX")}/>
              <Form.Check name="platform" type="checkbox" label="NS" value="NS" defaultChecked={userInfo.platform.includes("NS")}/>
              <Form.Check name="platform" type="checkbox" label="Other" value="Other" defaultChecked={userInfo.platform.includes("Other")}/>
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
