const express = require('express');
const app = express();

const courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'},
    {id:3, name:'course 3'},
    {id:4, name:'course 4'},
];

app.get('/', (req, res)=> {
    res.send('wllo World!!!');
});

app.get('/courses', (req,res)=>{
    res.send(courses);
});

app.get('/courses/:id', (req, res) => {
    // res.send(req.params.id);

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(course) res.send(course);
    else res.status(404).send(`Object Not found`);
});


//for query string

app.get('/man/:year/:month', (req, res) => {
    // res.send(req.params.year);
    res.send(req.query);
});

// dynamic port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}...`));