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
import {useNavigate} from "react-router-dom";
import Avatar from "../components/Avatar";

export default function MatchingPage() {
  const dispatch = useDispatch();
    useEffect(() => {
        if (currentUser) {
            dispatch(getAccountAsync(currentUser.uid));
        }
    }, []);
  const user = useSelector(state => state.account.currentUser);
  const { currentUser } = useAuth();
  const [genderOptions, setGenderOptions] = useState([]);
  const [matchings, setMatchings] = useState([]);
  const [showAlert, setShowAlert] = useState({show:false, variant: "success", message: "..."});
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const time = form.elements["time"].checked;
    const games = form.elements["game"].checked;
    const language = form.elements["language"].checked;
    const genders = genderOptions.map((a) => a.value);
    const queryString = new URLSearchParams({ genders, time, games, language }).toString();
    fetch(`https://room9-backend.onrender.com/users/${user.uid}/matching?${queryString}`, {
        method: 'GET'
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        setMatchings(data);
    }).catch((error) => {
        console.error(error);
    });
}

    function handleApprove(e, _id) {
        e.preventDefault();
        const acc = {type: "accept", _id: _id};
        fetch(`https://room9-backend.onrender.com/users/${user.uid}/requests`, {
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
            setMatchings(matchings.filter((m) => {
                return m._id === _id;
            }));
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

    function handleSend(e, uid) {
        e.preventDefault();
        const acc = {type: "send", _id: user._id};
        fetch(`https://room9-backend.onrender.com/users/${uid}/requests`, {
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
            setMatchings(matchings.filter((m) => {
                return m.uid !== uid;
            }));
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

    function handleSee(e, uid) {
        e.preventDefault();
        fetch(`https://room9-backend.onrender.com/users/${uid}`, {
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

return (
    <div className="container">
        <div className="box">
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
        </div>
         <div className="cards">
              {matchings.length === 0?
                  <h1 style={{ marginBottom: '100px' }}>No matching for you, sorry</h1>:
                  matchings.map((request) => (
                      <Card key={request.uid} style={{ minWidth: '550px', maxWidth: '550px', maxHeight: '350px' }}>
                          <div className="Request-container">
                              <div className="Request-image-container">
                                  <Avatar avatar={request.avatar} alt="Avatar" className="Request-image" style={{ minWidth: '250px', maxWidth: '250px', maxHeight: '350px' }} onClick={(e) => handleSee(e,request.uid)}/>
                                  <div className="Request-middle" style={{ right: "47.5%" }}>
                                      <div className="Request-text">See Profile</div>
                                  </div>
                              </div>

                          </div>
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
                                  <Button variant="secondary" onClick={(e) => setMatchings(matchings.filter((m) => {
                                      return m.uid !== request.uid;
                                  }))}>
                                      Ignore
                                  </Button>
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
}
// originally in line 180, comment for demo
//<div className="Request-detail-container">
//                                  <p>0 common friends</p>
//                                  <p>0 common games</p>
//                                  {request.time_zone === user.time_zone && <p>same time zone</p>}
//                                  <p>0 hours play-time overlapped</p>
//                              </div>