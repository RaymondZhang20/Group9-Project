const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String
    }
});

module.exports = mongoose.model('Game', gameSchema);