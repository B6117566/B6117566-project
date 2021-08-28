require('dotenv').config({ path: '../.env' });

const address = require('../test/Address.json');

// Require the framework and instantiate it
const express = require('express');
const app = express();

// Declare a route
app.get('/', (req, res) => {
  res.send(address);
});

// Run the server!
app.listen(process.env.PORT);
