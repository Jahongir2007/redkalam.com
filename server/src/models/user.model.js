import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: Object,
        required: false,
    },
    otpCode: {
        type: Number,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otpCodeForPasswordChanging: {
        type: Number,
        required: false,
        // default: 0,
    },
    allowedForPasswordChanging: {
        type: Boolean,
        default: false,
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    googleId: {
        type: String,
        required: false,
    }
}, {timestamps: true});

export const User = mongoose.model("User", UserSchema);