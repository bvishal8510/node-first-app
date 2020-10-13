const express = require('express');
const coursesrouter = express.Router();
const Joi = require('joi');

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

// get request
coursesrouter.get('/', (req,res)=>{
    res.send(courses);
});
coursesrouter.get('/:id', (req, res) => {
    // res.send(req.params.id);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(course) res.send(course);
    else res.status(404).send(`Object Not found`);
});


// post request
coursesrouter.post('/', (req, res) => {
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
coursesrouter.put('/:id', (req, res) => {
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
coursesrouter.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  res.status(404).send(`Object Not found`);
    else
    {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        res.send(courses);
    }
});

// //for query string
// router.get('/man/:year/:month', (req, res) => {
//     // res.send(req.params.year);
//     res.send(req.query);
// });

module.exports = coursesrouter;