const express = require("express");
const { sendMessage, getMessages } = require('../controllers/messages.js');
const router = express.Router();
router.post('/sendmsg', sendMessage);
router.post('/getmsg', getMessages);


module.exports = router;
