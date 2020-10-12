const config = require('config');
const morgan = require('morgan');
const logger = require('./logger');
const authenticate = require('./auth');
const Joi = require('joi');
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

// handling more environment variables
console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password'));

if(app.get('env') === 'development') app.use(morgan('tiny'));

const courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'},
    {id:3, name:'course 3'},
    {id:4, name:'course 4'},
];

function validate(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.get('/', (req, res)=> {
    res.send('wllo World!!!');
});

// get request
app.get('/courses', (req,res)=>{
    res.send(courses);
});
app.get('/courses/:id', (req, res) => {
    // res.send(req.params.id);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(course) res.send(course);
    else res.status(404).send(`Object Not found`);
});


// post request
app.post('/courses', (req, res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const {error, value} = schema.validate(req.body);         // result contains error and value(if valid request) 
    const {error, value} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    else{ 
        const course = {
            id:courses.length+1,
            name:req.body.name
        };
        courses.push(course);
        res.send(course);
    }
});

//put request
app.put('/courses/:id', (req, res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const {error, value} = schema.validate(req.body);         // result contains error and value(if valid request) 

    const course = courses.find(c => c.id === parseInt(req.params.id));
    const {error, value} = validate(req.body);
    if(!course)  res.status(404).send(`Object Not found`);
    else if(error) res.status(400).send(error.details[0].message);        
    else 
    {
        course.name = req.body.name;
        res.send(course);
    }
});

//delete request
app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  res.status(404).send(`Object Not found`);
    else
    {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.send(courses);
    }
});

//for query string
app.get('/man/:year/:month', (req, res) => {
    // res.send(req.params.year);
    res.send(req.query);
});

// dynamic port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}...`));
