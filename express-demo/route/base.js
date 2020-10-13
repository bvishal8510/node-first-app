const express = require('express');
const baserouter = express.Router();

baserouter.get('/', (req, res)=> {
    // res.send('wllo World!!!');
    res.render('base', { title:'Express App', message:'The message!!!'})
});

module.exports = baserouter;