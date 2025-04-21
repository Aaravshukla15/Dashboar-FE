import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "./mapcomponent.css"; // Import the custom CSS

const MapComponent = ({ data }) => {
  return (
    <div className="map-wrapper">
      <MapContainer center={[51.505, -0.09]} zoom={2}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((item, index) => {
          const { geolocation } = item;
          if (geolocation && geolocation.lat && geolocation.lon) {
            const latLng = new LatLng(geolocation.lat, geolocation.lon);
            return (
              <Marker key={index} position={latLng}>
                <Popup>{item.post_title}</Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
