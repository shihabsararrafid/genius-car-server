const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
// using middleware

app.use(cors());
app.use(express.json());

// using mongo db

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d7471.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("geniusCar").collection("services");
    //finding the all services
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);

      const result = await cursor.toArray();

      res.send(result);
    });
    //finding single services

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await serviceCollection.findOne(query);

      res.send(result);
    });
    app.post("/services", async (req, res) => {
      const result = req.body;

      const newService = await serviceCollection.insertOne(result);
      res.send(newService);

      console.log(newService);
    });
  } finally {
  }
}
run().catch(console.dir);

// testing the server whether it is running or not

app.get("/", (req, res) => {
  res.send("Running The Server");
});
app.listen(port, () => {
  console.log("Listening to the port,", port);
});
