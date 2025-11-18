import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

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
    skills: {
        type: [String],
        default:[]
    },
    about: {
        type: String,
        default:'This is a default about'
    },
    profilePic: {
        type: String,
        default:''
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default:''
    },
    ideas: {
        type: [ideaSchema],
        default:[]
    }

},{timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;