var express = require('express');
var router = express.Router();
const {getAllGames, getGame} = require('../controllers/gameController');

router.get('/', getAllGames);

router.get('/:id', getGame);

module.exports = router;