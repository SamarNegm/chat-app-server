const express = require("express");
const User = require('./../models/User.js');
const { catchAsync } = require('../utils/utils.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const { JWT_SECRET } = process.env;
module.exports.signup = catchAsync(async (req, res) => {
    console.log("Signup");
    const { name, password, email, isSuspended } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.json({ msg: "Email Already Exist", status: false });

    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name, email: email, password: hashedPassword, isSuspended: isSuspended });
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json(
        { status: true, user, token },

    );
});
module.exports.signin = catchAsync(async (req, res) => {
    const { email,
        password } = req.body;
    console.log(req.body);
    const existUser = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!existUser || !isPasswordCorrect) {
        return res.json({ msg: "Success", status: false, data: "User Email or password are not valid" });
    }
    const token = jwt.sign({ email: existUser.email, id: existUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Success", status: true, data: existUser, token });
});
module.exports.getAllUsersNotMe = catchAsync(async (req, res) => {
    console.log(req.params.id);
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    console.log(

        id
    )
    const users = await User.find({ _id: { $ne: id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
    ]);
    return res.json(users);
});
module.exports.notSuspend = catchAsync(async (req, res) => {
    const notSuspendUsers = await User.find().where('isSuspended').equals(false);
    res.json({ msg: "Success", data: notSuspendUsers });
})
module.exports.suspend = catchAsync(async (req, res) => {
    const SuspendUsers = await User.find().where('isSuspended').equals(true);
    res.status(202).json({ message: "Success", data: SuspendUsers });
})

module.exports.makeNotSuspend = catchAsync(async (req, res) => {
    const { id } = req.params;
    const notSuspendUsers = await User.findByIdAndUpdate(id, { 'isSuspended': false }, { new: true })
    res.status(202).json({ message: "Success", data: notSuspendUsers });
})
module.exports.makeSuspend = catchAsync(async (req, res) => {
    const { id } = req.params;
    const SuspendUsers = await User.findByIdAndUpdate(id, { 'isSuspended': true }, { new: true })
    res.status(202).json({ message: "Success", data: SuspendUsers });
})
module.exports.setAvatar = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(
        id,
        req.body.image
    );
    const user = await User.findByIdAndUpdate(id,
        { 'avatarImage': req.body.image, 'isAvatarImageSet': true },
        { new: true })
    return res.json({
        isSet: user.isAvatarImageSet,
        image: user.avatarImage,
    });
});