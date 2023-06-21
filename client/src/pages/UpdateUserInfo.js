import React, {useState, useEffect} from 'react';
import {useAuth} from "../contexts/AuthContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function UpdateUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const { currentUser } = useAuth();
  const uid = currentUser.uid;

  useEffect(() => {
    // Fetch the current user's information from the server
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:3001/users/${uid}`);
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        // Handle error
      }
    };
    fetchUserInfo();
  }, [uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the updated user information from the form
    const form = e.target;
    const updatedUserInfo = {
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
    const response = await fetch(`http://localhost:3001/users/${uid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserInfo)
    });
    if (response.ok) {
      alert("Updated Successfully!");
    } else {
      alert("Failed to update user information.");
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
              <Form.Label>First Name</Form.Label>
              <Form.Control name="first-name" type="text" placeholder="Enter First Name" defaultValue={userInfo.firstName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="last-name" type="text" placeholder="Enter Last Name" defaultValue={userInfo.lastName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTimeZone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control name = "time-zone" type="text" placeholder="Enter time zone" defaultValue={userInfo.timeZone} />
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
              <Form.Check name="playing-time" type="checkbox" label="Morning" value="Morning" />
              <Form.Check name="playing-time" type="checkbox" label="Afternoon" value="Afternoon" />
              <Form.Check name="playing-time" type="checkbox" label="Evening" value="Evening" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language spoken</Form.Label>
                  <Form.Check name="language" type="checkbox" label="English" value="English" />
                  <Form.Check name="language" type="checkbox" label="Spanish" value="Spanish" />
                  <Form.Check name="language" type="checkbox" label="French" value="French" />
                  <Form.Check name="language" type="checkbox" label="German" value="German" />
                  <Form.Check name="language" type="checkbox" label="Mandarin" value="Mandarin" />
                  <Form.Check name="language" type="checkbox" label="Cantonese" value="Cantonese" />
                  <Form.Check name="language" type="checkbox" label="Japanese" value="Japanese" />
                  <Form.Check name="language" type="checkbox" label="Korean" value="Korean"/>
                  <Form.Check name="language" type="checkbox" label="Italian" value="Italian"/>
                  <Form.Check name="language" type="checkbox" label="Portuguese" value="Portuguese"/>
                  <Form.Check name="language" type="checkbox" label="Russian" value="Russian"/>
                  <Form.Check name="language" type="checkbox" label="Arabic" value="Arabic"/>
                  <Form.Check name="language" type="checkbox" label="Hindi" value="Hindi"/>
                  <Form.Check name="language" type="checkbox" label="Bengali" value="Bengali"/>
                  <Form.Check name="language" type="checkbox" label="Dutch" value="Dutch"/>
                  <Form.Check name="language" type="checkbox" label="Swedish" value="Swedish"/>
                  <Form.Check name="language" type="checkbox" label="Other" value="Other"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlatform">
              <Form.Label>Platform</Form.Label>
              <Form.Check name="platform" type="checkbox" label="Phone" value="Phone"/>
              <Form.Check name="platform" type="checkbox" label="PC" value="PC"/>
              <Form.Check name="platform" type="checkbox" label="PS" value="PS"/>
              <Form.Check name="platform" type="checkbox" label="XBOX" value="XBOX"/>
              <Form.Check name="platform" type="checkbox" label="NS" value="NS"/>
              <Form.Check name="platform" type="checkbox" label="Other" value="Other"/>
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
