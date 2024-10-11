import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await axios.get("http://localhost:5173//api/stations");
      const trains = await axios.get("http://localhost:5173//api/trains");
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar color={currColor} data={stationData} />
      <TrainList color={currColor} data={trainData} />
      <div>
        {currColor === 'blue' || currColor === 'green' ? (
          <>
            <button>Eastbound</button>
            <button>Westbound</button>
          </>
        ) : (
          <>
            <button>Northbound</button>
            <button>Southbound</button>
          </>
        )}
        <button>Arriving</button>
        <button>Scheduled</button>
      </div>
    </div>
  );
}

