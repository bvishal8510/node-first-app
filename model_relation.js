const mongoose = require('mongoose');
const Fawn = require('fawn');


Fawn.init(mongoose);

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
    authors: [authorSchema]        //reference to object itself
}));

async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
    });
    //when we need to save two or more database objects related to eachother then we use Fawn library

    const result = await course.save();
    try{
        new Fawn.Task()     //has various different functions to do tasks
            .save('course', course)
            .update('author', {_id:author._id}, {
                $inc:{numberinstock:-1}
            })
            .run();     //important without it Fawn wont run
    }
    catch(ex){
        result.status(500).send('Internal Server Error!');
    }

};

createCourse('node course', [new Author({name: 'mos'}), new Author({name: 'amy'})]);     //calling with new 

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