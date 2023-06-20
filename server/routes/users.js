var express = require('express');
var router = express.Router();


var accounts = [
  {
    "email": "zhangxueyong2019@163.com",
    "uid": "K5G3uLk1Bub5bBwnwejZrEHNGIs2",
    "first_name": "XueYong",
    "last_name": "Zhang",
    "time_zone": null,
    "location": null,
    "pronoun": 1,
    "play_time": [1,2,3],
    "language": [1],
    "platform": [1,2,4,5]
  },
  {
    "email": "opkisky@gmail.com",
    "uid": "f5oaJV5FuSZViDZ12new9hwvw842",
    "first_name": "sss",
    "last_name": "zxx",
    "time_zone": null,
    "location": null,
    "pronoun": 1,
    "play_time": [1,2,3],
    "language": [1],
    "platform": [1,2,4,5]
  },
  {
    "email": "shawn01zhu@gmail.com",
    "uid": "RVKoP27ociPlYYVLq86aTEiymUW2",
    "first_name": "sss",
    "last_name": "zxx",
    "time_zone": null,
    "location": null,
    "pronoun": 1,
    "play_time": [1,2,3],
    "language": [1],
    "platform": [1,2,4,5]
  },
  {
    "email": "jasperhuang@hotmail.com",
    "uid": "GoTpCIvVrAM5VQgH5JK6ddPcZRp1",
    "first_name": "sss",
    "last_name": "zxx",
    "time_zone": null,
    "location": null,
    "pronoun": 1,
    "play_time": [1,2,3],
    "language": [1],
    "platform": [1,2,4,5]
  },
  {
    "email": "dorothy.unicorn@gmail.com",
    "uid": "eUaiHoqEwcTIkZg9ZyHFkSQ9Xd22",
    "first_name": "sss",
    "last_name": "zxx",
    "time_zone": null,
    "location": null,
    "pronoun": 1,
    "play_time": [1,2,3],
    "language": [1],
    "platform": [1,2,4,5]
  }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:uid', function (req, res, next) {
  const foundAcc = accounts.find(acc => acc.uid === req.params.uid);

  if (!foundAcc) {
    return res.status(404).send({ message: 'Cannot find the account in our system' });
  } else {
    return res.send(foundAcc);
  }
});

router.patch('/:uid', function (req, res, next) {
  const AccUid = req.params.uid;
  const updatedAcc = req.body;
  const foundAcc = accounts.find(acc => acc.uid === AccUid);
  if (foundAcc) {
    accounts = accounts.map((acc) => {
      if (acc.uid === AccUid) {
        return {...acc, ...updatedAcc};
      } else {
        return acc;
      }
    });
    return res.send({...foundAcc, ...updatedAcc});
  } else {
    return res.status(404).send({ message: 'Account not found, cannot update' });
  }
});



module.exports = router;
