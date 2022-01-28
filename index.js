// import packages
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const dev = require('debug')('app:dev');
const prod = require('debug')('app:prod');
const logger = require('./middleware/logger.js');
const rooms = require('./routes/rooms');
const home = require('./routes/home');

// create express app
const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// middlewares
// custom middlewares
app.use(logger);
// express middlewares
app.use(express.json()); // parse request data and put in request body property
app.use(express.urlencoded({ extended: true })); // parse url encoded data
app.use(express.static('public')); // provide public assets directory
// third-party-middlewares
app.use(morgan('tiny'));

// environments
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

// configuration settings
console.log(config.get('name'));
console.log(config.has('db.username'));
console.log(config.get('db.password'));

//debug
dev('Consoling dev errors');
prod('Consoling prod errors');

//routes
app.use('/', home);
app.use('/api/v1/rooms', rooms);

//server listens on port
const PORT = 4000;
app.listen(PORT, () => console.log(`App is running at ${PORT}`));
