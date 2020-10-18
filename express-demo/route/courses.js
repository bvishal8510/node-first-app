const express = require('express');
const coursesrouter = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playdb');

// const courses = [
//     {id:1, name:'course 1'},
//     {id:2, name:'course 2'},
//     {id:3, name:'course 3'},
//     {id:4, name:'course 4'},
// ];

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
        enum: ['node', 'angular', 'none'],
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

// get request
coursesrouter.get('/', async (req,res)=>{
    const courses = await Course.find();
    res.send(JSON.stringify(courses));
});
coursesrouter.get('/:id', async (req, res) => {
    // res.send(req.params.id);
    const course = await Course.find({_id:req.params.id});

    // const course = courses.find(c => c.id === parseInt(req.params.id));
    if(course) res.send(JSON.stringify(course));
    else res.status(404).send(`Object Not found`);
});


// post request
coursesrouter.post('/', async (req, res) => {

    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const {error, value} = schema.validate(req.body);         // result contains error and value(if valid request) 
    const {error, value} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    else{ 
        const course = new Course({
            name:req.body.name,
            category:req.body.category,
            author:req.body.author,
            tags:req.body.tags,
            ispublished:req.body.ispublished,
            price:req.body.price,
        });
        try{
            const result  = await course.save();
            res.send(JSON.stringify(result));
        }
        catch (ex){
            res.status(400).send(ex.errors);
            // for (field in ex.errors) console.log(ex.errors[field].message); //for each validation error
        }
        // res.send(course);
    }
});

//put request
coursesrouter.put('/:id', async (req, res) => {
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });
    // const {error, value} = schema.validate(req.body);         // result contains error and value(if valid request) 
    // const {error, value} = validate(req.body);
    
    const course  = await Course.find({_id:req.params.id});
    // const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if(!course)  res.status(404).send(`Object Not found`);
    // else if(error) res.status(400).send(error.details[0].message);     
    else 
    {
        const name = req.body.name || course.name;
        const category = req.body.category || course.category;
        const author = req.body.author || course.author;
        const tags = req.body.tags || course.tags;
        const ispublished = req.body.ispublished || course.ispublished;
        const price = req.body.price || course.price;
        
        try
        {    
            
            const result = await Course.findByIdAndUpdate(req.params.id,          //pass id
            {                                              
                $set:{
                name:name,
                category:category,
                author:author,
                tags:tags,
                ispublished:ispublished,
                price:price,
                }
            }, {new:true});    // this property return updated document else it returns original document 
            
            res.send(result);
        }
        catch(ex)
        {
            
            res.status(400).send(ex.errors);
        }
    }
});

//delete request
coursesrouter.delete('/:id', async (req, res) => {
    // const course = Course.findByIdAndRemove(req.params.id);
    const result = await Course.deleteOne({_id:req.params.id});
    res.send(JSON.stringify(result));
    // const course = courses.find(c => c.id === parseInt(req.params.id));
    // if(!course)  res.status(404).send(`Object Not found`);
    // else
    // {
    //     const index = courses.indexOf(course);
    //     courses.splice(index, 1);
    //     res.send(courses);i
    // }
});

// //for query string
// router.get('/man/:year/:month', (req, res) => {
//     // res.send(req.params.year);
//     res.send(req.query);
// });

module.exports = coursesrouter;