const { Socket } = require('dgram');
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

// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
//     console.log('message raised',arg);
// });


// const http = require('http');
// const server = http.createServer((req, res)=>{
//     if(req.url === '/'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

// // server.on('connection', (socket) => {
// //     console.log('new connection');
// // })

// server.listen(3000);

// console.log("listening to port... ");

const fs = require('fs');

// const allfiles = fs.readdirSync('./');
// console.log(allfiles);

fs.readdir('./', (err, result)=>{
    if(err) console.log(err);
    else console.log(result);
});
