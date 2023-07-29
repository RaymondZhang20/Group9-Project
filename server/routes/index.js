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

router.get('/img/avatar/apex', (req, res) => {
  res.sendFile('./images/apex.jpg', {root: path.join(__dirname, '..')});
});

router.get('/img/avatar/cod', (req, res) => {
  res.sendFile('./images/cod.jpg', {root: path.join(__dirname, '..')});
});

router.get('/img/avatar/mario', (req, res) => {
  res.sendFile('./images/mario.jpg', {root: path.join(__dirname, '..')});
});

router.get('/img/avatar/minecraft', (req, res) => {
  res.sendFile('./images/minecraft.jpg', {root: path.join(__dirname, '..')});
});

router.get('/img/avatar/overwatch', (req, res) => {
  res.sendFile('./images/overwatch.jpg', {root: path.join(__dirname, '..')});
});

module.exports = router;
