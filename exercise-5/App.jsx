import React, { useState } from "react";
import "./app.css"; 

const stations = ["All Stations", "Chamblee", "Brookhaven", "Midtown", "North Avenue", "Airport"];
const trains = [
  { station: "Midtown Station", destination: "Airport Station", line: "Gold", status: "On time", time: "3 min" },
];

function App() {
  const [activeFilter, setActiveFilter] = useState("Arriving");

  return (
    <div className="container">
      {/* Station List */}
      <div className="station-list">
        <h3>Select your starting station</h3>
        <ul>
          {stations.map((station, index) => (
            <li key={index}>{station}</li>
          ))}
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
        {trains.map((train, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default App;
