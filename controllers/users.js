import express from 'express';
import User from './../models/User.js'
import { catchAsync } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
export const signup = catchAsync(async (req, res) => {
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
export const signin = catchAsync(async (req, res) => {
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

export const notSuspend = catchAsync(async (req, res) => {
    const notSuspendUsers = await User.find().where('isSuspended').equals(false);
    res.json({ msg: "Success", data: notSuspendUsers });
})
export const suspend = catchAsync(async (req, res) => {
    const SuspendUsers = await User.find().where('isSuspended').equals(true);
    res.status(202).json({ message: "Success", data: SuspendUsers });
})

export const makeNotSuspend = catchAsync(async (req, res) => {
    const { id } = req.params;
    const notSuspendUsers = await User.findByIdAndUpdate(id, { 'isSuspended': false }, { new: true })
    res.status(202).json({ message: "Success", data: notSuspendUsers });
})
export const makeSuspend = catchAsync(async (req, res) => {
    const { id } = req.params;
    const SuspendUsers = await User.findByIdAndUpdate(id, { 'isSuspended': true }, { new: true })
    res.status(202).json({ message: "Success", data: SuspendUsers });
})
export const setAvatar = catchAsync(async (req, res) => {
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