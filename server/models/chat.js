const mongoose = require('mongoose');
const io = require('socket.io')(5001, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date
    }
});

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(`websocket on ${id}`);

    // socket.on('send-message', ({recipient, text}) => {
    //     socket.
    // })
})

module.exports = mongoose.model('Chat', chatSchema);