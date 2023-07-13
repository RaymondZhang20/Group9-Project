const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    platform: {
        type: Array
    }
});

module.exports = mongoose.model('Game', gameSchema);