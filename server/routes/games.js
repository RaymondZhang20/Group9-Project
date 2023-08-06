var express = require('express');
var router = express.Router();
const {getAllGames, postGame, searchGames} = require('../controllers/gameController');

router.get('/', getAllGames);

router.get('/:keyword', searchGames);

router.post('/', postGame);

module.exports = router;