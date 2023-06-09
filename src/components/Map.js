import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'


function Map(props) {
return <MapContainer center={[49.2677, -123.2420]} zoom={13} scrollWheelZoom={false} className="MainMap">
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
<Marker position={[49.2677, -123.2420]}>
  <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker>
</MapContainer>;
}

export default Map;