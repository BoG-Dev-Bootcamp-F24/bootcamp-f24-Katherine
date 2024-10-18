import React from "react";

const NavBar = ({ color, data }) => {
  return (
    <div className={`navbar ${color}`}>
      <h2>Stations</h2>
      <ul>
        {data.map((station, index) => (
          <li key={index}>{station.name}</li> // Adjust according to your station data structure
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
