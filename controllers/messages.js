import Message from '../models/Message.js';
import { catchAsync } from '../utils/utils.js'

export const sendMessage = catchAsync(async (req, res) => {
    const { from, to, message } = req.body;
    const data = await Message.create({
        message: message,
        users: [from, to],
        sender: from,
    });
    if (data) return res.json({ msg: "Message Sent" });
    else return res.json({ status: false, msg: "Message Failed" });

})

export const getMessages = catchAsync(async (req, res) => {
    const { from, to } = req.body;
    const messages = await Message.find({
        users: {
            $all: [from, to],
        },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message,
        };
    });
    res.json(projectedMessages);


})