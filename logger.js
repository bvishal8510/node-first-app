// console.log(__filename);
// console.log(__dirname);
const EventEmitter = require('events');
const url = 'http://mylogger.io/logs';

class Logger extends EventEmitter {
    log(message){
        console.log(message);
        this.emit('messageLogged', {id:1, url:'http://anything.com'});
    }
}


// module.exports=log;
// exports.log = log;
// module.exports.log = log;

module.exports=Logger;