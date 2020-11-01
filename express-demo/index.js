require('express-async-errors');
const coursesrouter = require('./route/courses');
const baserouter = require('./route/base');
const usersrouter = require('./route/users');
const authrouter = require('./route/auth');
const appdebugger = require('debug')('app:debug');
const dbdebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const error = require('./middleware/error');
const app = express();

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));             //accessing environemnt variable method

app.use(express.json()); 
app.use(express.urlencoded({ extended : true}));   // for submitting form as urlencoded
app.use(express.static('staticfiles'));     // handle staticfiles
// app.use(morgan('tiny'));                    // gives output of each request to console or log file
app.use('/', baserouter);
app.use('/courses', coursesrouter);
app.use('/users', usersrouter);
app.use('/auth', authrouter);

app.use(error);

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR!!');
    process.exit(1);
}

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
