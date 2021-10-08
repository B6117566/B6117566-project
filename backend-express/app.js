require('dotenv').config({ path: '../.env' });
const expressFunction = require('express');
const expressApp = expressFunction();
const bodyParser = require('body-parser');
const database = require('./config/database');
//--------------------------------------------------------------------------

//middleware
expressApp.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.BACKEND_ACCESS_CONTROL_ORIGIN
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    process.env.BACKEND_ACCESS_CONTROL_METHODS
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    process.env.BACKEND_ACCESS_CONTROL_HEADER
  );
  return next();
});

expressApp.use(bodyParser.json(), (err, req, res, next) => {
  //Error-handling bodyParser
  if (err) {
    return res.status(400).json({
      sucessful: false,
      result: { messages: String(err) },
    });
  }
  next();
});

//Connect Database
expressApp.use(database);
//----------------------------------------------------------------------------

//Endpoint (API)
expressApp.use('/api/v1', require('./routes/v1'));

expressApp.use('*', (req, res, next) => {
  res.status(501).json({
    sucessful: false,
    result: { messages: 'Method Not Implemented' },
  });
});
//----------------------------------------------------------------------------

// Run the server!
expressApp.listen(process.env.BACKEND_PORT);
