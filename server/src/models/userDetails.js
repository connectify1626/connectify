import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        name: {
            type: String,
            unique: true,
            default: null,
        },
        profilePath: {
            type: String,
            unique: true,
            default: null,
        },
        userDesc: {
            type: String,
            unique: true,
            default: null,
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
    },
    { timestamps: true }
);

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema, 'UserDetails');
export default UserDetails;