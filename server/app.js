var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
var mongoose = require('mongoose');
const io = require('socket.io')(5001, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});
const mongoAtlasUri =
    `mongodb+srv://raymond:11223344@cluster0.h62b0ay.mongodb.net/group_project?retryWrites=true&w=majority`;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

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

const Chat = require("./models/chat");
const User = require("./models/user");

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(`websocket on ${id}`);

    socket.on('send-message', ({recipient, message}) => {
        Chat.create({
            content: message.content,
            sender: id,
            recipient: recipient,
            timeStamp: message.timeStamp
        }).then((me) => {
            socket.emit('receive-message', me);
        }).catch((error) => {
            console.error(error);
        });
        // socket.signal.to(recipient).emit('receive-message', message);
    });
})

module.exports = app;
