import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getFriendsLocationAsync } from '../redux/mapReducers/thunks';
import { getAccountAsync } from '../redux/accountReducers/accountThunks';
import {useAuth} from "../contexts/AuthContext";


function Map(props) {

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

return <MapContainer center={[49.2677, -123.2420]} zoom={13} scrollWheelZoom={false}>
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
{/* {createPins(mapFriends)} */}
{createPins(mapFriends)}
</MapContainer>;
}

function createPins(mapFriends) {
  if (mapFriends[0] === undefined) {
  } else {
    console.log(mapFriends)
    var currentlocation = [mapFriends[0].geolocation.lat, mapFriends[0].geolocation.long]
    return (
      <div>
      <Marker position={currentlocation}>
        <Popup>g
          You are Here
        </Popup>
      </Marker>
      {mapFriends[0].friends.map((friend) => 
      createFriendsPins(friend)
      )}
    </div>
    )
  }
}

function createFriendsPins(friend) {
  console.log(friend)
  var friendLocation = [friend.geolocation.lat, friend.geolocation.long]
  return (      
  <Marker key = {friend.account_name} position={friendLocation}>
    <Popup>g
      {friend.account_name}
    </Popup>
  </Marker>
  )
}

export default Map;