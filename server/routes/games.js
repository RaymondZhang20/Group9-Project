var express = require('express');
var router = express.Router();
const {getAllGames, getGame, postGame} = require('../controllers/gameController');

router.get('/', getAllGames);

router.get('/:id', getGame);

router.post('/', postGame);

module.exports = router;