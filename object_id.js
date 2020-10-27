

// id = 5f86f9eed90f2813fb4bf348     //total 24 characters = 12 bytes   //created by Driver

    // 4 bytes = timestamp
    // 3 bytes = machine identifier
    // 2 bytes = process identifier
    // 3 bytes = counter

    // Driver  -> mongoDB

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log(id);

console.log(id.getTimestamp());

console.log(mongoose.Types.ObjectId.isValid('1234')); 