const Joi = require('joi');
const mongoose = require('mongoose');

const dbschema = new mongoose.Schema({
    name:{ 
        type: String, 
        required:true,
        maxlength:300,
        minlength:3,
    },
    category:{
        type:String,
        required:true,
        enum: ['node', 'angular', 'none', 'python'],
    },
    author:String,
    tags: {
        type:[String],
        validate: {
            isAsync:true,
            validator : function(v, callback){
                setTimeout(()=>{
                    const result = v && v.length > 0;
                    callback(result);
                },0000);
            },
            message: 'Should have atleast a tag'
        }
    },
    date: { type: Date, default:Date.now},
    ispublished:Boolean,
    price: {
        type:Number,
        required: function(){ return this.ispublished; }, 
        min:10, 
        max:500,
    }
});
const Course = mongoose.model('Course', dbschema);

function validate(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(300).required(),
        category: Joi.string().required(),
        author: Joi.string().required(),
        tags:Joi.array().items(Joi.string()).required(),
        date: Joi.date(),
        ispublished:Joi.boolean(),
        price: Joi.number(),
    });
    return schema.validate(course);
}

exports.validate = validate;
exports.Course = Course;