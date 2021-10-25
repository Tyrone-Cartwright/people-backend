///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require('dotenv').config();
// pull PORT from .env, give default value of 3001
const { PORT, DATABASE_URL } = process.env;
// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// import Middleware
const cors = require('cors');
const morgan = require('morgan');
const peopleController = require('./controllers/people');
// create application object
const app = express();
// Connect to MongoDB
mongoose.connect(DATABASE_URL);
// Set up MongoDB Listeners
// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
// Mount Middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan('dev')); // logging
app.use(express.json()); // parse json bodies

// Mount controllers
app.use('/people', peopleController);
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get('/', (req, res) => {
  res.send('hello world');
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
