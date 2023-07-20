var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/img/avatar/default', (req, res) => {
  res.sendFile('./images/default_user.png', {root: path.join(__dirname, '..')});
});

module.exports = router;
