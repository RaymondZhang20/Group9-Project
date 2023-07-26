const mongoose = require('mongoose');

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

module.exports = mongoose.model('Chat', chatSchema);