import express from "express";
import { register, login, logout, sendVerificationOtp, veryfyEmail, isUserAuthenticated, sendResetPasswordEmail, resetPassword } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp" , userAuth, sendVerificationOtp);
authRouter.post("/verify-account" , userAuth, veryfyEmail);
authRouter.get("/is-user-authenticated" , userAuth, isUserAuthenticated);
authRouter.post("/send-reset-otp" , sendResetPasswordEmail);
authRouter.post("/reset-password" , resetPassword);


export default authRouter;