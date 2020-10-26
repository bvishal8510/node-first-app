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

