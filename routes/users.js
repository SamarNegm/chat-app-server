const express = require("express");

const { signup, signin, logout, suspend, notSuspend, makeSuspend, setAvatar, makeNotSuspend, getAllUsersNotMe } = require('./../controllers/users.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/setavatar/:id", setAvatar);
router.get("/getAllUsersNotMe/:id", getAllUsersNotMe);
router.get("/logout/:id", logout);


router.get('/suspend', suspend);
router.get('/notSuspend', notSuspend);
router.post('/:id/suspend', makeSuspend);
router.post('/:id/notSuspend', makeNotSuspend);

module.exports = router;
