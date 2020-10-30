const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const usersrouter = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playdb');

// get request
usersrouter.get('/', async (req,res)=>{
    const courses = await Course.find();
    res.send(JSON.stringify(courses));
});


// post request
usersrouter.post('/', async (req, res) => {

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const {error, value} = schema.validate(req.body);         // result contains error and value(if valid request) 
    const {error, value} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email});
    if(user) res.status(400).send('User Already Present!!');
    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    user.password = password;
    await user.save();
    
    const token = user.generateAuthToken();         
    res.header('x-auth-token', token).send(_.pick(user,['_id','name','email']));
});

module.exports = usersrouter;