import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom UFO icon for map markers
const UFO_ICON = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/UFO_icon.svg",
  iconSize: [30, 30],
});

const App = () => {
  const [sightings, setSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2000-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [locationFilter, setLocationFilter] = useState("");
  const [shapeFilter, setShapeFilter] = useState("");

  useEffect(() => {
    fetch("/data/ufo_sightings.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (sighting) => sighting.latitude && sighting.longitude
        );
        setSightings(filteredData);
        setFilteredSightings(filteredData);
      });
  }, []);

  // Function to filter sightings based on selected criteria
  useEffect(() => {
    const filtered = sightings.filter((sighting) => {
      const sightingDate = new Date(sighting.date_time);
      return (
        sightingDate >= startDate &&
        sightingDate <= endDate &&
        (locationFilter === "" ||
          sighting.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
          (sighting.state &&
            sighting.state.toLowerCase().includes(locationFilter.toLowerCase())) ||
          (sighting.country &&
            sighting.country.toLowerCase().includes(locationFilter.toLowerCase()))) &&
        (shapeFilter === "" || sighting.ufo_shape.toLowerCase() === shapeFilter.toLowerCase())
      );
    });

    console.log("Filtered Sightings:", filtered); // Added this to debbug
    setFilteredSightings(filtered);
  }, [startDate, endDate, locationFilter, shapeFilter, sightings]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>UFO Sightings Tracker 👽</h1>

      {/* Filter Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
        <div>
          <label>Start Date: </label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
        <div>
          <label>Location: </label>
          <input
            type="text"
            placeholder="Enter city, state, or country"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div>
          <label>UFO Shape: </label>
          <input
            type="text"
            placeholder="Enter UFO shape"
            value={shapeFilter}
            onChange={(e) => setShapeFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Map Section */}
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredSightings.slice(0, 100).map((sighting, index) => (
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
