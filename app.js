// // // console.log(module.paths);

// // const log = require('./logger');  // ./ for user defined modules

// // // log("mine");

// // const path = require('path');   // just name For built-in module
// // const cpobj = path.parse(__filename);
// // console.log(cpobj); 

// const os = require('os');

// const freem = os.freemem();
// const totalm = os.totalmem();

// console.log(`total memory : ${totalm}`);
// console.log(`free memory ${freem}`);

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', function(){
    console.log('message raised');
})

emitter.emit('messageLogged');


