const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    account_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    online: {
        type: Boolean,
        required: true
    },
    geolocation: {
        type: Object
    },
    profile: {
        type: Object
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    ignored_requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    games: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Game'
    }
});

module.exports = mongoose.model('User', userSchema);