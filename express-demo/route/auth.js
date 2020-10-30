const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const authrouter = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playdb');

// post request
authrouter.post('/', async (req, res) => {
    
    const {error, value} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email});
    if(!user) res.status(400).send('Invalid email or password');

    const valid_password = await bcrypt.compare(req.body.password, user.password);
    if(!valid_password) res.status(400).send('Invalid email or password');
        
    res.send(true);
});

function validate(user){
    const schema = Joi.object({
        email: Joi.string().max(255).min(5).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(user);
}

module.exports = authrouter;