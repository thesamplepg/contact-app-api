const mongoose = require('mongoose');

module.exports = () => new Promise((resolve, reject) => {

    mongoose.connect(require('../keys').mongoDB, {useNewUrlParser: true}, (err) => {

        if(err) reject(err);

        resolve('--[ MongoDB connected ]--');

    });

});