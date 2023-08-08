import {Link, Navigate, useNavigate} from "react-router-dom";
import {Card, Stack, Button, Nav, Alert} from 'react-bootstrap'
import Map from "../components/Map";
import {useAuth} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccountAsync, updateAccountAsync} from "../redux/accountReducers/accountThunks";
import user_img from "../redux/default_user.png"
import "../components/Request.css"
import {emptyAccount, testAccount} from "../redux/accountReducers/accountReducer";
import Avatar from "../components/Avatar";

export default function MapPage() {
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
    const user = useSelector(state => state.account.currentUser);

  const handleSearch = (searchText) => {
    // Perform search logic based on the entered search text
    // Update the map display accordingly
    console.log('Search text:', searchText);
  };

    return (
        <div id="MapPage-whole">
            <Navigate to={"/"+currentUser.uid} replace={true} />
            <h1>MainPage</h1>
            <WelcomeHeader accountName={user.account_name} />
            <FriendRequests/>
            <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Map />
            </div>

        </div>
    );
}
function WelcomeHeader({ accountName }) {
    return (
        <header className="welcome-header">
            <h3>Welcome, {accountName}!</h3>
        </header>
    );
}


const FriendRequests = () => {
    const [requestState, setRequestSate] = useState("pending");
    const [showAlert, setShowAlert] = useState({show:false, variant: "success", message: "..."});
    const [change, setChange] = useState(0);
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [change]);
    let user = useSelector(state => state.account.currentUser);
    const handleSelect = async (eventKey) => {
        setRequestSate(eventKey);
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
                setShowAlert({
                    show: true,
                    variant: "success",
                    message: data

                });
        }).catch((error) => {
            setShowAlert({
                show: true,
                variant: "danger",
                message: error.message

            });
        });
    }

    function handleIgnore(e, _id) {
        e.preventDefault();
        const acc = {type: "ignore", _id: _id};
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
            setShowAlert({
                show: true,
                variant: "success",
                message: data

            });
        }).catch((error) => {
            setShowAlert({
                show: true,
                variant: "danger",
                message: error.message

            });
        });
    }

    function handlePend(e, _id) {
        e.preventDefault();
        const acc = {type: "pend", _id: _id};
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
            setShowAlert({
                show: true,
                variant: "success",
                message: data

            });
        }).catch((error) => {
            setShowAlert({
                show: true,
                variant: "danger",
                message: error.message

            });
        });
    }

    function handleRemove(e, _id) {
        e.preventDefault();
        const acc = {_id: _id};
        fetch(`http://localhost:5000/users/${user.uid}/remove`, {
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
            setShowAlert({
                show: true,
                variant: "success",
                message: data.message
            });
        }).catch((error) => {
            setShowAlert({
                show: true,
                variant: "danger",
                message: error.message
            });
        });
    }

    function handleSee(e, uid) {
        e.preventDefault();
        fetch(`http://localhost:5000/users/${uid}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((data) => {
            navigate(`/${user.uid}/profile`, {state: data});
        }).catch((error) => {
            console.error(error);
        });
    }

    const GenerateCards = () => {
      switch (requestState) {
          case "pending":
              return user.requests.length === 0?
                      <h3 style={{ marginBottom: '100px'}}>No pending requests for now... <br/> Go to matching page to find more friends! </h3>:
                      user.requests.map((request) => (
                          <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                              <div className="Request-container">
                                  <div className="Request-image-container">
                                      {/*<Card.Img src={user_img} alt="Avatar" className="Request-image" style={{width: '250px', height: '250px'}} onClick={(e) => handleSee(e,request.uid)}/>*/}
                                      <Avatar avatar={request.avatar} alt="Avatar" className="Request-image" style={{width: '250px', height: '250px'}} onClick={(e) => handleSee(e,request.uid)}/>
                                      <div className="Request-middle"  style={{ left: "50%" }}>
                                          <div className="Request-text">See Profile</div>
                                      </div>
                                  </div>
                              </div>
                              <Card.Body>
                                  <Card.Title className="text-center">{request.account_name}</Card.Title>
                                  <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                                      <Button variant="primary" onClick={(e) => handleApprove(e,request._id)}>
                                          Accept
                                      </Button>
                                      <Button variant="secondary" onClick={(e) => handleIgnore(e,request._id)}>
                                          Ignore
                                      </Button>
                                  </div>
                              </Card.Body>
                          </Card>))
          case "ignored":
              return user.ignored_requests.length === 0?
                  <h3 style={{ marginBottom: '100px' }}>No ignored requests for now...</h3> :
                  user.ignored_requests.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                          <Avatar avatar={request.avatar} variant="top" style={{width: '250px', height: '250px'}}/>
                          <Card.Body>
                              <Card.Title className="text-center">{request.account_name}</Card.Title>
                              <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                                  <Button variant="primary" onClick={(e) => handlePend(e,request._id)}>
                                      Move To Pending
                                  </Button>
                              </div>
                          </Card.Body>
                      </Card>))
          case "friends":
              return user.friends.length === 0?
                  <h3 style={{ marginBottom: '100px' }}>You have no friends... <br/> Go to matching page to find more friends! </h3>:
                  user.friends.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                          <Avatar avatar={request.avatar} variant="top" style={{width: '250px', height: '250px'}}/>
                          <Card.Body>
                              <Card.Title className="text-center">{request.account_name}</Card.Title>
                              <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                                  <Button variant="primary" onClick={(e) => handleRemove(e,request._id)}>
                                      Remove
                                  </Button>
                                  <Button variant="primary" onClick={(e) => handleSee(e,request.uid)}>
                                      See Profile
                                  </Button>
                              </div>
                          </Card.Body>
                      </Card>))
      }
    }

    return (
        <Card border="info" className="ms-3 me-3 mb-3">
            <Card.Header>
                <Nav variant="tabs" onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="pending">Pending Friend Requests</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="ignored">Ignored Friend Requests</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="friends">Friends</Nav.Link>
                    </Nav.Item>
                </Nav>
                {showAlert.show &&
                    <Alert variant={showAlert.variant} onClose={() => setShowAlert({...showAlert, show: false})} dismissible>
                        <Alert.Heading>{showAlert.message}</Alert.Heading>
                    </Alert>}
            </Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3} className='overflow-auto'>
                    <GenerateCards/>
                </Stack>
            </Card.Body>
        </Card>
    );
};