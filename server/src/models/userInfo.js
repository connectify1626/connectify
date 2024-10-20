import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
    {
        uniqueId: {
            type: Number,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        profilePath: {
            type: String,
            unique: true,
            default: null,
        },
        token: {
            type: String,
            default: null,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            default: null,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        joinedOn: {
            type: Date,
            default: Date.now,
        },
        lastLogIn: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfo');
export default UserInfo;