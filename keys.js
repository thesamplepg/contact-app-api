if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

module.exports = {
    mongoDB: process.env.MONGO_URI,
}