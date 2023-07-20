const Game = require("../models/game");

function getAllGames(req, res, next) {
    Game.find().then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the users');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

function getGame(req, res, next) {
    Game.findById(req.params.id).then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the users');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

module.exports = {getAllGames, getGame}