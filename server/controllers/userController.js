const User = require("../models/user");
const Chat = require("../models/chat");

function getAllUsers(req, res, next) {
    User.find().then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the users');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

async function postUser(req, res, next) {
    try {
        sameUser = await User.find({uid: req.body.uid});
        if (!sameUser) {
            res.status(204).json({message: 'The same account has been created'});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
    const newAccount = new User({
        email: req.body.email,
        uid: req.body.uid,
        account_name: req.body.account_name,
        online: false,
        avatar: "default",
        geolocation: {lat: null, long: null},
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
}

function getFriendsLocation(req, res, next) {
    User.find({uid: req.params.uid}).select('geolocation uid friends').populate({path:'friends', select:'account_name uid geolocation'}).then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the user');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

function patchUserLogout(req, res, next) {
    User.findOneAndUpdate({uid: req.params.uid},{online: false},{returnDocument:'after'}).then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the user');
        } else {
            res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

function patchUserRemoveFriend(req, res, next) {
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
}

function patchUserRequests(req, res, next) {
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
}

function getUserMatching(req, res, next) {
    const genderFrontend = req.query.genders.split(',');
    const pronouns = [
        {value: "he", label: "He/Him"},
        {value: "she", label: "She/Her"},
        {value: "they", label: "They/Them"},
        {value: "ze", label: "Ze/Hir"},
        {value: "xe", label: "Xe/Xem"},
        {value: "o", label: "Other"}
    ];
    const genders = pronouns.filter(pronoun => genderFrontend.includes(pronoun.value)).map(pronoun => pronoun.label);
    const timeChecked = req.query.time;
    const gamesChecked = req.query.games;
    const languageChecked = req.query.language;
    console.log(genders, timeChecked, gamesChecked, languageChecked);
    User.find({uid: req.params.uid}).then((result) => {
        const friends_id = [...result[0]["friends"], result[0]["_id"]];
        const requests_id = [...result[0]["requests"].map(f => f.valueOf()), ...result[0]["ignored_requests"].map(f => f.valueOf())];
        const language = result[0].profile.language;
        const games = result[0].games;
        const time = result[0].profile.standard_time;
        return [{requests_id}, {
            $nor: friends_id.map(f => {
                return {_id: f}
            })
        }, language, games, time];
    }).then((query) => {
        console.log(query);
        let findQuery = {...query[1]};
        if (languageChecked === true) {
            findQuery['profile.language'] = {$in: query[2]};
        }
        if (gamesChecked === true) {
            findQuery['games'] = {$in: query[3]};
        }
        if (timeChecked === true) {
            findQuery['profile.standard_time'] = {$in: query[4]};
        }
        if (genders.length >= 1) {
            findQuery['profile.pronoun'] = {$in: genders};
        }
        console.log(findQuery);
        return User.find(findQuery).select('account_name uid profile').then((result2) => {
            const result_with_requests = result2.map((f) => {
                let requested = query[0]["requests_id"].includes(f["_doc"]["_id"].valueOf());
                return Object.assign({requested}, f["_doc"]);
            })
            res.status(200).json(result_with_requests);
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: err.message});
    });
}

function getUserLogIn(req, res, next) {
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
}

function deleteUser(req, res, next) {
    User.deleteMany({uid: req.params.uid})
        .then((result) => {
            if (!result) {
                res.status(404).send('Cannot found the user');
            } else {
                res.status(200).json({message: "The account is closed"});
            }
        }).catch((err) => {
        res.status(500).json({message: err.message});
    });
};

function patchUser(req, res, next) {
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
}

function getMessages(req, res, next) {
    const query = { $or: [
            {$and: [{sender: req.params.senderUid}, {recipient: req.params.reciUid}]},
            {$and: [{recipient: req.params.senderUid}, {sender: req.params.reciUid}]}
        ]};
    Chat.find(query).then((result) => {
        if (!result) {
            res.status(404).send('Cannot found the messages');
        } else {
            res.status(200).json(result.map((message) => {
                if (message.sender === req.params.senderUid) {
                    return {...message._doc, sentByMe: true};
                } else {
                    return {...message._doc, sentByMe: false};
                }
            }));
        }
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
}

module.exports = {getAllUsers, postUser, getFriendsLocation, patchUserLogout, patchUserRemoveFriend, patchUserRequests, getUserMatching, getUserLogIn, deleteUser, patchUser, getMessages};