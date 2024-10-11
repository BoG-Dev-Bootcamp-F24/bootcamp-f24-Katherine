const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");


mongoose.connect("mongodb+srv://klogue7:ProData101!@bog-marta-cluster.fqz4r.mongodb.net/?retryWrites=true&w=majority&appName=BoG-Marta-Cluster")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

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
  tripId: String
});

const stationSchema = new mongoose.Schema({
  name: String,
  line: String,
});

const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);

const readJSONFile = (filePath) => {   
  const data = fs.readFileSync(filePath);   
  return JSON.parse(data); 
};

const processStationData = (data) => {   
  const stations = [];
  for (const [line, names] of Object.entries(data)) {
    names.forEach(name => {
      stations.push({name, line});
    });
  }
  return stations;
};

const processTrainData = (data) => {     
  const trains = [];     
  data.forEach(train => {       
    trains.push({         
      destination: train.DESTINATION,         
      direction: train.DIRECTION,         
      eventTime: new Date(train.EVENT_TIME),
      headSign: train.HEAD_SIGN,         
      line: train.LINE,         
      nextArrival: new Date(train.NEXT_ARR),       
      station: train.STATION,         
      trainId: train.TRAIN_ID,         
      waitingSeconds: Number(train.WAITING_SECONDS),        
      waitingTime: train.WAITING_TIME,         
      responseTimestamp: new Date(train.RESPONSETIMESTAMP),         
      vehicleLongitude: train.VEHICLELONGITUDE,         
      vehicleLatitude: train.VEHICLELATITUDE,         
      delay: train.DELAY,         
      tripId: train.TRIP_ID,       
    });     
  });        
  return trains;   
};

const importData = async () => {     
  try {       
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });       
    const rawData = readJSONFile(path.join(__dirname, "trainData.json"));       
    const trains = rawData.RailArrivals;
    const processedTrains = processTrainData(trains);          
    const stationData = readJSONFile(path.join(__dirname, "stationData.json"));              
    const stations = processStationData(stationData);          
    await Train.insertMany(processedTrains);       
    await Station.insertMany(stations);        
  } 

  catch (error) {     
  } finally {       
    await mongoose.connection.close();     
  }   
};    

importData();

