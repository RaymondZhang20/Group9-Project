const Game = require("../models/game");

function getAllGames(req, res, next) {
    Game.find().then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the games');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

function searchGames(req, res, next) {
    Game.find(
        {
            "title" : {"$regex": req.params.keyword, "$options": "i"}
        }).then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the games');
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
            res.status(404).send('Cannot found the game');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

async function postGame(req, res, next) {
    const newGame = new Game({
        title: req.body.title,
        platform: req.body.platform,
        url: req.body.url
    });
    try {
        const saved = await newGame.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {getAllGames, getGame, postGame, searchGames}