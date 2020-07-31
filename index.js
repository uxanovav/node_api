const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/app');
const { MongoURI } = require('./config/app');

const app = express();
require('./config/express')(app);
require('./config/routes')(app);

mongoose.connect(config.MongoURI)
    .then(() => 
    app.listen(config.PORT, 'localhost', ()=> {console.log('Сервер запущен')})
    )
    .catch(() => console.error(`error connrcting to mongdb ${MongoURI}`))

