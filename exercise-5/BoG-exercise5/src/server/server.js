const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose.connect("mongodb+srv://klogue7:ProData101!@bog-marta-cluster.fqz4r.mongodb.net/?retryWrites=true&w=majority&appName=BoG-Marta-Cluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trainSchema = new mongoose.Schema({
  destination: String,
  direction: String,
  eventTime: Date,
  headSign: String,
  line: String,
  nextArrival: Date,
  station: String,
  trainId: String,
  waitingSeconds: Number,
  waitingTime: String,
  responseTimestamp: Date,
  vehicleLongitude: String,
  vehicleLatitude: String,
  delay: String,
  tripId: String,
});

const stationSchema = new mongoose.Schema({
  name: String,
  line: String,
});

const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);

app.get("/api/trains", async (req, res) => {
    try {
      const trains = await Train.find();
      res.status(200).json(trains);
    } catch (err) {
      res.status(500).json(err);
    }
    
  });

app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json(err);
  }
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




