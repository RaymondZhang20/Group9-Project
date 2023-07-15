import {Link, Navigate} from "react-router-dom";
import {Card, Stack, Button, Nav, Alert} from 'react-bootstrap'
import Map from "../components/Map";
import Footer from "../components/Footer";
import {useAuth} from "../contexts/AuthContext";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccountAsync, updateAccountAsync} from "../redux/accountReducers/accountThunks";
import user_img from "../redux/default_user.png"
import {emptyAccount, testAccount} from "../redux/accountReducers/accountReducer";

export default function MapPage() {
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, [currentUser]);
    const user = useSelector(state => state.account.currentUser);
  {/* Footer Boilerplate */}
  const markers = [
      { id: 1, name: 'Marker 1', filter: 'Category A' },
      { id: 2, name: 'Marker 2', filter: 'Category B' },
      { id: 3, name: 'Marker 3', filter: 'Category A' },
      { id: 4, name: 'Marker 4', filter: 'Category C' },
  ];

  const filterOptions = ['Category A', 'Category B', 'Category C'];

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    // Perform filtering logic based on the selected filter
    // Update the map display accordingly
    console.log('Selected filter:', selectedFilter);
  };

  const handleSearch = (searchText) => {
    // Perform search logic based on the entered search text
    // Update the map display accordingly
    console.log('Search text:', searchText);
  };

    return (
        <div id="MapPage-whole">
            <Navigate to={"/"+currentUser.uid} replace={true} />
            <h1>MainPage</h1>
            <h2>Welcome, {user.account_name}</h2>
            <h2>You have 0 new matches, and 0 new messages</h2>
            <FriendRequests/>
            <Map />

        {/* Footer Boilerplate */}
        <Footer
              markers={markers}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
        />
        {/* Ends here */}
        </div>
    );
}

const FriendRequests = () => {
    const [requestState, setRequestSate] = useState("pending");
    const [showAlert, setShowAlert] = useState({show:false, variant: "success", message: "..."});
    const [change, setChange] = useState(0);
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
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
            // setShowAlert({
            //     show: true,
            //     variant: "success",
            //     message: data
            // });
        }).catch((error) => {
            // setShowAlert({
            //     show: true,
            //     variant: "danger",
            //     message: error.message
            // });
        });
    }
    const GenerateCards = () => {
      switch (requestState) {
          case "pending":
              return user.requests.length === 0?
                      <h1 style={{ marginBottom: '100px' }}>No pending requests for now... <br/> Go to matching page to find more friends! </h1>:
                      user.requests.map((request) => (
                          <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                              <Card.Img variant="top" src={user_img} style={{width: '250px', height: '250px'}}/>
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
                  <h1 style={{ marginBottom: '100px' }}>No ignored requests for now...</h1> :
                  user.ignored_requests.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                          <Card.Img variant="top" src={user_img} style={{width: '250px', height: '250px'}}/>
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
                  <h1 style={{ marginBottom: '100px' }}>You have no friends... <br/> Go to matching page to find more friends! </h1>:
                  user.friends.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '250px', maxWidth: '250px' }}>
                          <Card.Img variant="top" src={user_img} style={{width: '250px', height: '250px'}}/>
                          <Card.Body>
                              <Card.Title className="text-center">{request.account_name}</Card.Title>
                              <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                                  <Button variant="primary" onClick={(e) => handleRemove(e,request._id)}>
                                      Remove
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