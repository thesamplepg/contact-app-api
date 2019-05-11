const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const dbConnect = require('./utilits/database');
const { logger } = require('./utilits/middleWares');
const keys = require('./keys');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(cors);
app.use(bodyParse.json())
app.use(cookieParser())

app.use(logger);

app.use('/', require('./routes'));

dbConnect()
    .then(res => {
        console.log(res);

        app.listen(process.env.PORT || 5000, () => {
            console.log('--[ Server has started ]--');
        });
    })
    .catch(err => {
        console.log(err);
    });

