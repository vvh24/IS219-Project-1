import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom UFO icon for map markers
const UFO_ICON = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/UFO_icon.svg",
  iconSize: [30, 30],
});

const App = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("/data/ufo_sightings.json") // Load the JSON file
      .then((response) => response.json())
      .then((data) => {
        // Filter data to show only valid coordinates
        const filteredData = data.filter(
          (sighting) => sighting.latitude && sighting.longitude
        );
        setSightings(filteredData);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>UFO Sightings Tracker 👽</h1>
      <MapContainer
        center={[39.8283, -98.5795]} // Center on the USA
        zoom={4}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sightings.slice(0, 100).map((sighting, index) => (
          <Marker
            key={index}
            position={[parseFloat(sighting.latitude), parseFloat(sighting.longitude)]}
            icon={UFO_ICON}
          >
            <Popup>
              <strong>Date:</strong> {sighting.date_time} <br />
              <strong>City:</strong> {sighting.city}, {sighting.state} <br />
              <strong>Shape:</strong> {sighting.ufo_shape} <br />
              <strong>Description:</strong> {sighting.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
