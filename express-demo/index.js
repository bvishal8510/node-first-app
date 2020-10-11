const express = require('express');
const app = express();

app.get('/', (req, res)=> {
    res.send('wllo World!!!');
});

app.get('/courses', (req,res)=>{
    res.send([1,2,3]);
});

app.get('/courses/:id', (req, res) => {
    res.send(req.params.id);
});


//for query string

app.get('/man/:year/:month', (req, res) => {
    // res.send(req.params.year);
    res.send(req.query);
});

// dynamic port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to ${port}...`));