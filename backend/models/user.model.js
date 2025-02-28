import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    resetpasswordToken: {
        type: String,
    },
    resetpasswordExpires: {
        type: Date,
    }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
