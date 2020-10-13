
// const p = Promise.resolve({'id':1, 'name':"Complete"});
// p.then(result => console.log('result', result));

const { resolve } = require("path");

// const p = Promise.reject(new Error('Something went wrong...'));
// p.catch(err => console.log(err));


const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Promise 1 running...');
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Promise 2 running...');
        resolve(2);
    },2000);
});


// Promise.all([p1, p2])                   
//     .then(result => console.log(result))       //works only if all the promises are resolved 
//     .catch(err => console.log(err.message));   //works if any of promises given rejects

Promise.race([p1, p2])                   
    .then(result => console.log(result))       //works as soon as any of promises given is fulfilled 
    .catch(err => console.log(err.message));   //works if any of promises given rejects