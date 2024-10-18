import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";

const fetchStationData = async () => await axios.get("http://localhost:5000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:5000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("gold");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);
  
  const renderTrainButtons = () => {
    if (currColor === "green" || currColor === "blue") {
      return (
        <>
          <button>Arriving</button>
          <button>Scheduled</button>
          <button>Eastbound</button>
          <button>Westbound</button>
        </>
      );
    } else {
      return (
        <>
          <button>Arriving</button>
          <button>Scheduled</button>
          <button>Northbound</button>
          <button>Southbound</button>
        </>
      );
    }
  };

  return (
    <div>
      <h1 className="title">{currColor.toUpperCase()}</h1>
      <div className="linesPageContainer">
        <div className="navBar">
          <NavBar color={currColor} data={stationData} />
        </div>
        <div className="trainListContainer">
          <div className="trainButtons">
            {renderTrainButtons()}
          </div>
          <div className="trainList">
            <TrainList line={currColor} data={trainData} />
          </div>
        </div>
      </div>
    </div>
  );
}