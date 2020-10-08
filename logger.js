console.log(__filename);
console.log(__dirname);
const url = 'http://mylogger.io/logs';

function log(message){
    console.log(message);
}

module.exports=log;
// exports.log = log;
// module.exports.log = log;
