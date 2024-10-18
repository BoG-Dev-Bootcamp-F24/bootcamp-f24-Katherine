import React from "react";

const TrainList = ({ line, data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((train, index) => (
          <div key={index} className="train-info">
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
        <p>No trains available</p>
      )}
    </div>
  );
};

export default TrainList;
