import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getFriendsLocationAsync } from '../redux/mapReducers/thunks';
import { getAccountAsync } from '../redux/accountReducers/accountThunks';
import {useAuth} from "../contexts/AuthContext";
import {Button} from 'react-bootstrap'
import {Link, Navigate, useNavigate} from "react-router-dom";
import Avatar from './Avatar';


function Map(props) {
  const navigate = useNavigate();
  const mapFriends = useSelector(state => state.mapReducer.locations);
  const dispatch = useDispatch();
  const {currentUser} = useAuth();

  useEffect(() => {
    if (currentUser) {
        dispatch(getAccountAsync(currentUser.uid));
    }
  }, [currentUser]);

  const user = useSelector(state => state.account.currentUser);
  useEffect(() => {
    dispatch(getFriendsLocationAsync(currentUser.uid))
  }, [dispatch])

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

function createPins(mapFriends) {
  if (mapFriends[0] === undefined) {
  } else {
    var currentlocation = [mapFriends[0].geolocation.lat, mapFriends[0].geolocation.long]
    return (
      <div>
         <MapContainer center={currentlocation} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
              <Marker position={currentlocation}>
                <Popup>
                  You are Here
                </Popup>
              </Marker>
              {mapFriends[0].friends.map((friend) => 
              createFriendsPins(friend)
                  )}
          </MapContainer>;
        </div>
    )
  }
}

function createFriendsPins(friend) {
  var friendLocation = [friend.geolocation.lat, friend.geolocation.long]
  console.log(Object.keys(friend))
  return (      
  <Marker key = {friend.account_name} position={friendLocation}>
    <Popup>
      <center>
      <h2>{friend.account_name}</h2>
        <Avatar avatar={friend.avatar} variant="top" style={{width: '250px', height: '250px'}}/>
        <Button variant="primary" onClick={(e) => handleSee(e,friend.uid)}>
            See Profile
        </Button>
      </center>
    </Popup>
  </Marker>
  )
}

return (
  <div>{createPins(mapFriends)}</div>
)
}


export default Map;