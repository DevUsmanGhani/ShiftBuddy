const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const managers = require('./routes/api/managers');

const app = express();

// Connect mongoose to MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));




// Basic page to test app works
app.get('/', (req,res) => {
    res.send("ShiftBuddy")
})


// Initialize port and run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log("Now listening on port: " + PORT);
})

