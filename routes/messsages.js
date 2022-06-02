import express from 'express';
import { sendMessage, getMessages } from '../controllers/messages.js';
const router = express.Router();
router.post('/sendmsg', sendMessage);
router.post('/getmsg', getMessages);


export default router;
