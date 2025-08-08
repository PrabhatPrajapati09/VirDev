import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
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
    verifyOtpExpire: {
        type: Number,
        default:0
    },
    isUserVerified: {
        type: Boolean,
        default: false,
    },
    
});

const User = mongoose.model("User", userSchema);