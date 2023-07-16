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
    email: req.body.email,
    uid: req.body.uid,
    account_name: req.body.account_name,
    online: false,
    geolocation: {lat: null, lon: null},
    profile: {},
    friends: [],
    requests: [],
    ignored_requests: [],
    games: []
  });
  try {
    const saved = await newAccount.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
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

router.patch('/:uid/logout', function(req, res, next) {
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

router.patch('/:uid/remove', function(req, res, next) {
  User.findOneAndUpdate({uid: req.params.uid}, {$pull: {"friends": req.body._id}}).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      User.findByIdAndUpdate(req.body._id, {$pull: {"friends": result["_id"]}}).then((result) => {
        res.status(200).json({message: "successfully removed"});
      }).catch((err) => {
        res.status(500).json({message: err.message});
      });
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.patch('/:uid/requests', function(req, res, next) {
  const updater = {
    send: {query: {$addToSet: {"requests": req.body._id}},message: 'The request is sent successfully'},
    accept: {query: {$addToSet: {"friends": req.body._id}, $pull: {"requests": req.body._id, "ignored_requests": req.body._id}},message: 'The request is accepted successfully'},
    ignore: {query: {$addToSet: {"ignored_requests": req.body._id}, $pull: {"requests": req.body._id}},message: 'The request is ignored successfully'},
    pend: {query: {$addToSet: {"requests": req.body._id}, $pull: {"ignored_requests": req.body._id}},message: 'The request is pended successfully'},
  }
  User.findOneAndUpdate({uid: req.params.uid},updater[req.body.type]["query"]).then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      if (req.body.type === "accept") {
        return User.findByIdAndUpdate(req.body._id, {$addToSet: {"friends": result["_id"]}}).then((result) => {
          res.status(200).json(updater[req.body.type]["message"]);
        }).catch((err) => {
          res.status(500).json({message: err.message});
        });
      }
      res.status(200).json(updater[req.body.type]["message"]);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.get('/:uid/matching', function(req, res, next) {
  User.find({uid: req.params.uid}).then((result) => {
    const friends_id = [...result[0]["friends"], result[0]["_id"]];
    const requests_id = [...result[0]["requests"].map(f => f.valueOf()), ...result[0]["ignored_requests"].map(f => f.valueOf())];
    return [{requests_id}, {
      $nor: friends_id.map(f => {
        return {_id: f}
      })
    }];
  }).then((query) => {
    return User.find(query[1]).select('account_name uid').then((result2) => {
      const result_with_requests = result2.map((f) => {
        let requested = query[0]["requests_id"].includes(f["_doc"]["_id"].valueOf());
        return Object.assign({requested}, f["_doc"]);
      })
      res.status(200).json(result_with_requests);
    });
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.get('/:uid', function(req, res, next) {
  User.findOneAndUpdate({uid: req.params.uid},{online: true}, {returnDocument:'after'})
      .populate({path:'friends', select:'account_name uid'})
      .populate({path:'requests', select:'account_name uid'})
      .populate({path:'ignored_requests', select:'account_name uid'})
      .then((result) => {
    if (!result) {
      res.status(404).send('Cannot found the user');
    } else {
      res.status(200).json(result);
    }
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.delete('/:uid', function(req, res, next) {
  User.findOneAndDelete({uid: req.params.uid})
      .then((result) => {
        if (!result) {
          res.status(404).send('Cannot found the user');
        } else {
          res.status(200).json({message: "The account is closed"});
        }
      }).catch((err) => {
    res.status(500).json({message: err.message});
  });
});

router.patch('/:uid', function (req, res, next) {
  const AccUid = {uid: req.params.uid};
  const updatedAcc = req.body;
  User.findOneAndUpdate(AccUid,updatedAcc,{returnDocument:'after'})
      .populate({path:'friends', select:'account_name uid'})
      .populate({path:'requests', select:'account_name uid'})
      .populate({path:'ignored_requests', select:'account_name uid'})
      .then((result) => {
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
