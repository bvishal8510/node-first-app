
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playdb')
    .then(() => console.log('connected to db...'))
    .catch(err => console.error('could not connect', err));
    
const dbschema = new mongoose.Schema({
    name:String,
    author:String,
    tags: [ String ] ,
    date: { type: Date, default:Date.now},
    ispublished:Boolean,
});

async function createCourse(){
    const Course = mongoose.model('Course', dbschema);
    const course = new Course({
        name:'Angular Course',
        author:'Vishal',
        tags:['angular','beginner','frontend'],
        ispublished:true
    });

    const result = await course.save();
    console.log(result);
};
createCourse();