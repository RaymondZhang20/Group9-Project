import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getFriendsLocationAsync } from '../redux/mapReducers/thunks';
import { getAccountAsync } from '../redux/accountReducers/accountThunks';
import {useAuth} from "../contexts/AuthContext";


function Map(props) {

  const mapFriends = useSelector(state => state.mapReducer.locations);
  console.log(mapFriends)
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
<Marker position={[49.2677, -123.2420]}>
  <Popup>g
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker>
</MapContainer>;
}

export default Map;