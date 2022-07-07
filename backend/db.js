const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.rpjmkch.mongodb.net/meanDB?retryWrites=true&w=majority', err => {
    if(!err) console.log('DB connection sucessfull');
    else console.log('Error in connection' + err);
})

module.exports = mongoose;