const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const { use } = require('../route/auth');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        minlength:5,
        required:true
    },
    email:{
        type:String,
        maxlength:225,
        minlength:5,
        required:true,
        unique:true
    },
    password:{
        type:String,
        maxlength:1024,
        minlength:5,
        required:true
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);



function validate(user){
    const schema = Joi.object({
        name: Joi.string().max(50).min(5).required(),
        email: Joi.string().max(255).min(5).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validate;