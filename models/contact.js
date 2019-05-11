const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    app: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('contact', ContactSchema);