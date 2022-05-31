import express from 'express';
import { signup, signin, suspend, notSuspend, makeSuspend, makeNotSuspend } from './../controllers/users.js'
const router = express.Router();

router.post('/signup', signup);
router.get('/signin', signin);
router.get('/suspend', suspend);
router.get('/notSuspend', notSuspend);
router.post('/:id/suspend', makeSuspend);
router.post('/:id/notSuspend', makeNotSuspend);

export default router;
