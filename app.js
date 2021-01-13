'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/routes.js');
const mongoose = require('mongoose');
const path = require('path');
const MONGODB_URI = process.env.MONGODB_URI;

//connect to db 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


//mongo connection object
const db = mongoose.connection;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

app.use(express.static('client/build'));

// app.use(cors())
app.use(cors({                                                                 
  exposedHeaders:['Location'],                                                                                                                         
}))
//Set up to parse request body and json
// app.use(express.urlencoded({extended: true}));
app.use(express.json())


// setup morgan which gives us http request logging
app.use(morgan('dev'));

//list on connections
db.on('error', (err) => {
  console.log(`Connection Error: ${err}`);
});

//close db connection
db.once('open', () => {
  console.log('Database connection open');
});


//ROUTING
app.use('/api', router);



// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  //Check if schema validation check set any messages on the error object, if so => 400 status
  if(err.message.includes('validation failed')){
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
