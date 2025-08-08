import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
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
    },
    verifyOtp: {
        type: String,
        default:''
    },
    verifyOtpExpireAt: {
        type: Number,
        default:0
    },
    isUserVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default:''
    },
    resetOtpExpireAt: {
        type: Number,
        default:0
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;