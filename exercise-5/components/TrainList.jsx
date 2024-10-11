import Train from "./Train";

export default function TrainList({ color, data }) {
  const filteredTrains = data.filter(train => train.line === color.toUpperCase());

  return (
    <div>
      {filteredTrains.map(train => (
        <Train key={train.trainId} train={train} />
      ))}
    </div>
  );
}
