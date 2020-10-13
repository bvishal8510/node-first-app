const coursestouter = require('./route/courses');
const baserouter = require('./route/base');
const appdebugger = require('debug')('app:debug');
const dbdebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const express = require('express');
const app = express();

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));             //accessing environemnt variable method

app.use(express.json()); 
app.use(logger);
app.use(authenticate);
app.use(express.urlencoded({ extended : true}));   // for submitting form as urlencoded
app.use(express.static('staticfiles'));     // handle staticfiles
// app.use(morgan('tiny'));                    // gives output of each request to console or log file
app.use('/', baserouter);
app.use('/courses', coursestouter);

//templating engine
app.set('view engine', 'pug');
// app.set('views', './views')   //this is default setting can be changed 

// handling more environment variables
// console.log(config.get('name'));
// console.log(config.get('mail.host'));
// console.log(config.get('mail.password'));

if(app.get('env') === 'development') app.use(morgan('tiny'));

appdebugger('App debugger');        // used for debugging... 
dbdebugger('DB Debugger');          // DEBUG=app:* nodemon index.js

// dynamic port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}...`));
