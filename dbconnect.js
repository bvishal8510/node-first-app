
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
const Course = mongoose.model('Course', dbschema);
async function createCourse(){
    const course = new Course({
        name:'Angular Course',
        author:'Vishal',
        tags:['angular','beginner','frontend'],
        ispublished:true
    });

    const result = await course.save();
    console.log(result);
};
// createCourse();

async function findCourse(){
    // eq, ne(not equal to), gt, gte, lt, lte, in, nin (not in) comparision operators 
    // or, and logical operators
    const courses = await Course
        // .find({price:{$eq:10}})                  for equal to
        // .find({price: {$gte:10, $lte:20}})     to get courses between 10 and 20
        // .find({price: { $in:[10,15,20]}})      to get courses with Equal to 10, 15, 20 
        // .find()
        // .or([{author:'Vishal'}, {ispublished:true}])   //each object is a condition
        .find({author:'Vishal'})
        .limit(10)                  //to set limit number of objects returned
        .sort({name:1})         //set to -1 for desc order and can add more properties
        .select({name:1, tags:1});    //to show only selected properties
    console.log(courses);
};
findCourse();