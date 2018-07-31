const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const managers = require('./routes/api/managers');
const employees = require('./routes/api/employees');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Connect mongoose to MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// Basic page to test app works
app.get('/', (req,res) => {
    res.send("ShiftBuddy")
})

//Use Routes
app.use('/api/managers', managers);
app.use('/api/employees', employees);


// Initialize port and run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log("Now listening on port: " + PORT);
})

