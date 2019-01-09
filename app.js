const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoDb', { useNewUrlParser: true }, function(err,db){
    if (err) throw err;
    console.log('Database created');
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    next();
});

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(7000);