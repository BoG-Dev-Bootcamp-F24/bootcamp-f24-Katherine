import React, { useState, useEffect } from "react";
import "./app.css"; 
import axios from "axios";

const fetchStationData = async () => await axios.get("http://localhost:5000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:5000/api/trains");

function App() {
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Arriving");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await fetchStationData();
        console.log("Stations data:", stations.data); 
        const trains = await fetchTrainData();
        console.log("Trains data:", trains.data);
        setStationData(stations.data); 
        setTrainData(trains.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  
  

  return (
    <div className="container">
      {/* Station List */}
      <div className="station-list">
        <h3>Select your starting station</h3>
        <ul>
          {stationData.length > 0 ? (
            stationData.map((station, index) => (
              <li key={index}>{station.name}</li>
            ))
          ) : (
            <li>Loading stations...</li>
          )}
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">GOLD</div>

        {/* Button bar */}
        <div className="button-bar">
          {["Arriving", "Scheduled", "Northbound", "Southbound"].map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Train Information */}
        <div className="train-list">
          {trainData.length > 0 ? (
            trainData.map((train, index) => (
              <div className="train-info" key={index}>
                <div className="logo">M</div>
                <div className="details">
                  <div>{`${train.station} ➔ ${train.destination}`}</div>
                  <div>
                    <span className="line">{train.line}</span>{" "}
                    <span className="status">{train.status}</span>
                  </div>
                </div>
                <div className="time">{train.time}</div>
              </div>
            ))
          ) : (
            <p>Loading trains...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
