const express = require('express');
const app = express();
const port = process.env.PORT||5000;
const cors = require('cors');

// using middleware

app.use(cors());
app.use(express.json());

// testing the server whether it is running or not

app.get('/',(req,res)=>{
    res.send("Running The Server");
})
app.listen(port,()=>{
    console.log("Listening to the port,",port);
})