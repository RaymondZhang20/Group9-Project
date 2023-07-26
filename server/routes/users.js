var express = require('express');
var router = express.Router();
const {getAllUsers, postUser, getFriendsLocation, patchUserLogout, patchUserRemoveFriend, patchUserRequests, getUserMatching, getUserLogIn, deleteUser, patchUser,
    getMessages
} = require("../controllers/userController");

router.get('/', getAllUsers);

router.post('/', postUser);

router.get('/friendslocation/:uid', getFriendsLocation);

router.patch('/:uid/logout', patchUserLogout);

router.patch('/:uid/remove', patchUserRemoveFriend);

router.patch('/:uid/requests', patchUserRequests);

router.get('/:uid/matching', getUserMatching);

router.get('/:uid', getUserLogIn);

router.delete('/:uid', deleteUser);

router.patch('/:uid', patchUser);

router.get('/:senderUid/:reciUid', getMessages);


module.exports = router;
