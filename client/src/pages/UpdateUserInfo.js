import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function UpdateUserInfo() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', justifyContent: 'center', paddingTop: '60px' }}>
      <Card className="card-container" style={{ width: '550px' }}>
        <Card.Body>
          <Card.Title>Update Info</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTimeZone">
              <Form.Label>Time Zone</Form.Label>
              <Form.Control type="text" placeholder="Enter time zone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPronouns">
              <Form.Label>Pronoun</Form.Label>
              <Form.Control as="select" defaultValue="">
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
              <Form.Label>Pref playing time</Form.Label>
              <Form.Check type="checkbox" label="Morning" />
              <Form.Check type="checkbox" label="Afternoon" />
              <Form.Check type="checkbox" label="Evening" />
            </Form.Group>

            <Form.Group className="mb-3 language-group" controlId="formBasicLanguage">
              <Form.Label>Language spoken</Form.Label>
                  <Form.Check type="checkbox" label="English" />
                  <Form.Check type="checkbox" label="Spanish" />
                  <Form.Check type="checkbox" label="French" />
                  <Form.Check type="checkbox" label="German" />
                  <Form.Check type="checkbox" label="Mandarin" />
                  <Form.Check type="checkbox" label="Cantonese" />
                  <Form.Check type="checkbox" label="Japanese" />
                  <Form.Check type="checkbox" label="Korean" />
                  <Form.Check type="checkbox" label="Italian" />
                  <Form.Check type="checkbox" label="Portuguese" />
                  <Form.Check type="checkbox" label="Russian" />
                  <Form.Check type="checkbox" label="Arabic" />
                  <Form.Check type="checkbox" label="Hindi" />
                  <Form.Check type="checkbox" label="Bengali" />
                  <Form.Check type="checkbox" label="Dutch" />
                  <Form.Check type="checkbox" label="Swedish" />
                  <Form.Check type="checkbox" label="Other" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlatform">
              <Form.Label>Platform</Form.Label>
              <Form.Check type="checkbox" label="Phone" />
              <Form.Check type="checkbox" label="PC" />
              <Form.Check type="checkbox" label="PS" />
              <Form.Check type="checkbox" label="XBOX" />
              <Form.Check type="checkbox" label="NS" />
              <Form.Check type="checkbox" label="Other" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Submission Successful</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Your form has been submitted successfully!</p>
                {/* Additional content for the modal body */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateUserInfo;
