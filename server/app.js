var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
var mongoose = require('mongoose');
const mongoAtlasUri =
    `mongodb+srv://shawn:11223344@cluster0.h62b0ay.mongodb.net/group_project?retryWrites=true&w=majority`;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

try {
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 }
    );
} catch (e) {
    console.log("could not connect");
}
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to MongoDB");
});

module.exports = app;
