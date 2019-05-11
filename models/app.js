const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    requests: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('app', AppSchema);