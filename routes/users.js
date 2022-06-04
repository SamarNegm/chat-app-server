import express from 'express';
import { signup, signin, suspend, notSuspend, makeSuspend, setAvatar, makeNotSuspend, getAllUsersNotMe } from './../controllers/users.js'
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/setavatar/:id", setAvatar);
router.post("/getAllUsersNotMe/:id", getAllUsersNotMe);

router.get('/suspend', suspend);
router.get('/notSuspend', notSuspend);
router.post('/:id/suspend', makeSuspend);
router.post('/:id/notSuspend', makeNotSuspend);

export default router;
