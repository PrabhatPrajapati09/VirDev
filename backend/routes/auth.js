import express from "express";
import { register, login, logout, sendVerificationOtp, veryfyEmail, isUserAuthenticated } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp" , userAuth, sendVerificationOtp);
authRouter.post("/verify-account" , userAuth, veryfyEmail);
authRouter.post("/is-user-authenticated" , userAuth, isUserAuthenticated);


export default authRouter;