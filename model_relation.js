const mongoose = require('mongoose');


//referencing model
const Author = mongoose.model('author', new mongoose.Schema({
    name:String,
    bio:String,
    website: String,
}));

const Course = mongoose.model('course', new mongoose.Schema({
    name:String,
    author: {
        type: mongoose.Schema.Types.ObjectId,           //reference to id
        ref: 'author'
    }
}));

async function listcourses(){
    const courses = await Course
        .find()
        .populate('author', 'name -_id')     // to convert stored references to actual objects
        .populate('books', 'book_name')     // if reference under reference 
        .select('name author');
        console.log(courses);
}


//embedded model
const Author = mongoose.model('author', new mongoose.Schema({
    name:String,
    bio:String,
    website: String,
}));

const Course = mongoose.model('course', new mongoose.Schema({
    name:String,
    author: authorSchema        //reference to object itself
}));

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
};

createCourse('node course', new Author({name: 'mos'}));     //calling with new 

        // for update -> we can use update along with set property to author.name (to reach particular property)
        // use unset to remove a property or object as whole

async function listcourses(){
    const courses = await Course
        .find()
        .populate('author', 'name -_id')     // to convert stored references to actual objects
        .populate('books', 'book_name')     // if reference under reference 
        .select('name author');
        console.log(courses);
}