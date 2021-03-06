
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playdb')
    .then(() => console.log('connected to db...'))
    .catch(err => console.error('could not connect', err));
    
const dbschema = new mongoose.Schema({
    name:{ 
        type: String, 
        required:true,
        maxlength:300,
        minlength:3,
        // match:/pattern/   //to match to a regex
    },   // namongoose.connect('mongodb://localhost/playdb')me is required
    category:{
        type:String,
        required:true,
        enum: ['node', 'angular', 'none'],  // category value should match one of the given values
        // lowercase:true,
        // uppercase:true,
        // trim:true
    },
    author:String,
    tags: {
        type:[String],
        validate: {
            isAsync:true,
            validator : function(v, callback){            // custom validator
                setTimeout(()=>{
                    //do some task
                    const result = v && v.length > 0; // so that value is not null and there is atleast one tag
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
        required: function(){ return this.ispublished; },    //this is way to set required as per condition 
        min:10,             //also available for dates
        max:500,            //also available for dates
        // get: v => Math.round(v),     // called when we get property of document
        // set: v => Math.round(v)  // called when we set property of document
    }
});
const Course = mongoose.model('Course', dbschema);
async function createCourse(){
    const course = new Course({
        name:'New Angular Course',
        category:'-',
        author:'Vishal',
        tags:null,
        ispublished:true,
        price:200,
    });

    try{
        const result = await course.save();
        console.log(result);    
    }
    catch (ex){
        for (field in ex.errors) console.log(ex.errors[field].message); //for each validation error
    }
};
createCourse();

async function findCourse(){
    // eq, ne(not equal to), gt, gte, lt, lte, in, nin (not in) comparision operators 
    // or, and logical operators
    const pagenumber = 2;
    const pagesize = 10;
    const courses = await Course
        // .find({price:{$eq:10}})                  for equal to
        // .find({price: {$gte:10, $lte:20}})     to get courses between 10 and 20
        // .find({price: { $in:[10,15,20]}})      to get courses with Equal to 10, 15, 20 
        // .find()
        // .or([{author:'Vishal'}, {ispublished:true}])   //each object is a condition

        // .find({author: /^Mosh/i})          starts with mosh (i for case sensitive)
        // .find({author: /Mosh$/i})          ends with mosh (i for case sensitive) 
        // .find({author: /.*Mosh.*/i})          have mosh in between (i for case sensitive)

        .find({author:'Vishal'})
        .skip((pagenumber - 1)*pagesize)            //implement pagenation along with limit method
        .limit(10)                  //to set limit number of objects returned
        .sort({name:1})         //set to -1 for desc order and can add more properties
        // .sort('name')  for asc and .sort('-name') for Desc
        .select({name:1, tags:1});    //to show only selected properties
        // .select('name tags')         this also can be used
        // .count();   // incase to get count
    console.log(courses);
};
// findCourse();

//this is find first and then update method 
async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    course.set({
        author:'another author',
        ispublished:false
    });

    const result = await course.save();
    console.log(result);
}
// updateCourse('5f86f9eed90f2813fb4bf348');

//this is update first and then i
async function updateCourseFirst(id){
    //doesnot return document object
    // const result = Course.update({_id:id},          //argument is condition to retrieve 
    //     {                                           //can be used to retrieve multiple documents    
    //         $set:{
    //             author:'Ashu',
    //             ispublished:true
    //         }
    //     });
    const result = await Course.findByIdAndUpdate(id,          //pass id
        {                                              
            $set:{
                author:'Ashu',
                ispublished:true
            }
        }, {new:true});    // this property return updated document else it returns original document 
    console.log(result);    
}

// updateCourseFirst('5f86f9eed90f2813fb4bf348');

async function deleteCourse(id){
    // const result = await Course.deleteOne({_id:id});   // find first and delete
    // const result = await Course.deleteMany({_id:id});   // Deletes all
    const course = Course.findByIdAndRemove(id);
    console.log(course); 
    // console.log(result);    
}

// deleteCourse('5f86f9eed90f2813fb4bf348');