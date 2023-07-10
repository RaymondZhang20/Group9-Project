var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Game = require("../models/game");

// var accounts = [
//   {
//     "email": "zhangxueyong2019@163.com",
//     "uid": "K5G3uLk1Bub5bBwnwejZrEHNGIs2",
//     "account_name": "abc",
//     "first_name": "XueYong",
//     "last_name": "Zhang",
//     "time_zone": "UTC-08:00",
//     "location": null,
//     "pronoun": "He/Him",
//     "play_time": ["Evening"],
//     "language": ["Spanish","French","Russian","Arabic"],
//     "platform": ["Phone","NS"],
//     "friends": ["f5oaJV5FuSZViDZ12new9hwvw842", "RVKoP27ociPlYYVLq86aTEiymUW2", "GoTpCIvVrAM5VQgH5JK6ddPcZRp1", "eUaiHoqEwcTIkZg9ZyHFkSQ9Xd22"],
//     "invitations": [],
//     "matches": []
//   },
//   {
//     "email": "opkisky@gmail.com",
//     "uid": "f5oaJV5FuSZViDZ12new9hwvw842",
//     "account_name": "abc",
//     "first_name": "sss",
//     "last_name": "zxx",
//     "time_zone": "UTC-08:00",
//     "location": null,
//     "pronoun": "He/Him",
//     "play_time": ["Evening"],
//     "language": ["Spanish","French","Russian","Arabic"],
//     "platform": ["Phone","NS"],
//     "friends": [],
//     "invitations": [],
//     "matches": []
//   },
//   {
//     "email": "shawn01zhu@gmail.com",
//     "uid": "RVKoP27ociPlYYVLq86aTEiymUW2",
//     "account_name": "abc",
//     "first_name": "sss",
//     "last_name": "zxx",
//     "time_zone": "UTC-08:00",
//     "location": null,
//     "pronoun": "He/Him",
//     "play_time": ["Evening"],
//     "language": ["Spanish","French","Russian","Arabic"],
//     "platform": ["Phone","NS"],
//     "friends": [],
//     "invitations": [],
//     "matches": []
//   },
//   {
//     "email": "jasperhuang@hotmail.com",
//     "uid": "GoTpCIvVrAM5VQgH5JK6ddPcZRp1",
//     "account_name": "abc",
//     "first_name": "sss",
//     "last_name": "zxx",
//     "time_zone": "UTC-08:00",
//     "location": null,
//     "pronoun": "He/Him",
//     "play_time": ["Evening"],
//     "language": ["Spanish","French","Russian","Arabic"],
//     "platform": ["Phone","NS"],
//     "friends": [],
//     "invitations": [],
//     "matches": []
//   },
//   {
//     "email": "dorothy.unicorn@gmail.com",
//     "uid": "eUaiHoqEwcTIkZg9ZyHFkSQ9Xd22",
//     "account_name": "abc",
//     "first_name": "sss",
//     "last_name": "zxx",
//     "time_zone": "UTC-08:00",
//     "location": null,
//     "pronoun": "He/Him",
//     "play_time": ["Evening"],
//     "language": ["Spanish","French","Russian","Arabic"],
//     "platform": ["Phone","NS"],
//     "friends": [],
//     "invitations": [],
//     "matches": []
//   }
// ];

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(accounts);
// });
//
// router.get('/:uid', function (req, res, next) {
//   const foundAcc = accounts.find(acc => acc.uid === req.params.uid);
//
//   if (!foundAcc) {
//     return res.status(404).send({ message: 'Cannot find the account in our system' });
//   } else {
//     return res.send(foundAcc);
//   }
// });
//
// router.post('/', function (req, res, next) {
//   const newAccount = {
//     uid: req.body.uid,
//     account_name: req.body.account_name,
//     play_time: [],
//     language: [],
//     platform: [],
//     friends: [],
//     invitations: [],
//     matches: []
//   }
//   accounts.push(newAccount);
//   return res.send(newAccount);
// });
//
// router.patch('/:uid', function (req, res, next) {
//   const AccUid = req.params.uid;
//   const updatedAcc = req.body;
//   const foundAcc = accounts.find(acc => acc.uid === AccUid);
//   if (foundAcc) {
//     accounts = accounts.map((acc) => {
//       if (acc.uid === AccUid) {
//         return {...acc, ...updatedAcc};
//       } else {
//         return acc;
//       }
//     });
//     return res.send({...foundAcc, ...updatedAcc});
//   } else {
//     return res.status(404).send({ message: 'Account not found, cannot update' });
//   }
// });

router.get('/', function(req, res, next) {
  User.find().then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the users');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.post('/', async function (req, res, next) {
  const newAccount = new User({
    email: req.boby.email,
    uid: req.body.uid,
    account_name: req.body.account_name,
    online: false,
    geolocation: {lat: null, lon: null},
    profile: {},
    friends: [],
    requests: [],
    games: []
  });
  try {
    const saved = await newAccount.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.patch('/logout/:uid', function(req, res, next) {
  User.findOneAndUpdate({uid: req.params.uid},{online: false},{returnDocument:'after'}).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.get('/friendslocation/:uid', function(req, res, next) {
  User.find({uid: req.params.uid}).select('geolocation uid friends').populate({path:'friends', select:'account_name uid geolocation'}).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.get('/:uid', function(req, res, next) {
  User.findOneAndUpdate({uid: req.params.uid},{online: true}, {returnDocument:'after'}).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.patch('/:uid', function (req, res, next) {
  const AccUid = {uid: req.params.uid};
  const updatedAcc = req.body;
  User.findOneAndUpdate(AccUid,updatedAcc,{returnDocument:'after'}).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});



module.exports = router;
