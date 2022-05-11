const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT||5000;
const cors = require('cors');
require('dotenv').config();
// using middleware

app.use(cors());
app.use(express.json());

// using mongo db 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d7471.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected with mongo db");
  client.close();
});

// testing the server whether it is running or not

app.get('/',(req,res)=>{
    res.send("Running The Server");
})
app.listen(port,()=>{
    console.log("Listening to the port,",port);
})