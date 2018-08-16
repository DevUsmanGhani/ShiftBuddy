// Enviornmental variables
const dotenv = require('dotenv');
dotenv.config();

// Dependencies
const express = require('express'),
 			mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      keys = require('./config/keys'),
      path = require('path');
      
// Express routers
const managers = require('./routes/api/managers'),
 			employees = require('./routes/api/employees'),
 			shifts = require('./routes/api/shift'),
 			notes = require('./routes/api/note'),
 			paidOuts = require('./routes/api/paidOuts'),
 			cashDrops = require('./routes/api/cashDrops'),
      checks = require('./routes/api/checks'),
      inventoryItems = require('./routes/api/inventoryItems');

const app = express();

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Connect mongoose to MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Passport initialization
app.use(passport.initialize());

// Passport configuration
passportConfig = require('./config/passport');
passportConfig(passport);



// Use API Routes
app.use('/api/managers', managers);
app.use('/api/employees', employees);
app.use('/api/shifts', shifts);
app.use('/api/notes', notes);
app.use('/api/paidOuts', paidOuts);
app.use('/api/cashDrops', cashDrops);
app.use('/api/checks', checks),
app.use('/api/inventoryItems', inventoryItems);



// For prodution only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Initialize port and run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log("Now listening on port: " + PORT);
})
