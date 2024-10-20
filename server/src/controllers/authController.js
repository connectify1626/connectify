import UserInfo from "../models/userInfo.js";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { createTokenOptions } from "../helpers/cookies.js";
import generateTokens from "../helpers/token.js";
import generateUniqueId from "../helpers/commFuncHelper.js";

/* Register User */
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const uniqueId = generateUniqueId();

        const newUser = new UserInfo({
            uniqueId,
            username,
            email,
            password: passwordHash
        });

        const user = await newUser.save();
        const userId = user._id;

        await UserInfo.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { createdBy: userId } // Update createdBy
        );

        res.status(201).json({
            success: true,
            message: "Signup Successfully."
        });
    }
};

/* User Login */
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { username, password, isRemember = false } = req.body;

        const user = await UserInfo.findOne({ username });
        if (!user) return res.status(400).json({ success: false, message: "User doesn't exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password." });

        const { authToken } = await generateTokens(user);

        let lastlogin = new Date();
        await UserInfo.findOneAndUpdate(
            { _id: user._id }, // Find the user by ID
            { LastLogIn: lastlogin, token: authToken },
        );

        const token = `Bearer ${authToken}`;
        
        isRemember && res.cookie('token', token, {
            ...createTokenOptions(),
            maxAge: 7 * 24 * 60 * 60 * 1000 //Expire in 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login Successfully.",
            token: token,
        });
    }
};

/* LOGGING OUT */
export const handleLogout = async (req, res) => {
    const { userId } = req.body;

    await UserInfo.findOneAndUpdate(
        { _id: userId }, // Find the user by ID
        { token: null },
    );

    res.clearCookie('token', createTokenOptions());
    res.status(200).json({
        success: true,
        message: "Logout Successfully!!!",
    });
}