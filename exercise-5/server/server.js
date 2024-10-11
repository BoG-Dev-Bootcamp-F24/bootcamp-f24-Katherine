
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://klogue7:<ProData101!>@bog-marta-cluster.fqz4r.mongodb.net/?retryWrites=true&w=majority&appName=BoG-Marta-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find(); // Fetch all stations
    res.json(stations);
  } catch (error) {
    res.status(500).send("Error fetching stations");
  }
});
