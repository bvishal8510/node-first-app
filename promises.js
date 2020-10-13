const { rejects } = require("assert");
const { resolve } = require("path");

const p = new Promise((resolve, reject)=>
{
    // after async work either we get resolve or reject
    setTimeout(()=>{
        resolve(1);  // result of resolve is stored in result
        // reject(new Error('something went wrong !!'));// to show error
    },2000);
});

p  .then(result => console.log('result',result))
    .catch(err => console.log('error', err.message));