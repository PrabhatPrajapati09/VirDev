import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getSuggestions, getUserData } from "../controllers/userController.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { updateUserData } from "../controllers/userController.js";
import { createIdea, getIdeas, getMyIdeas, deleteIdea } from "../controllers/ideaController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.put("/update", verifyUser, updateUserData);
userRouter.get("/suggestions", userAuth, getSuggestions);
userRouter.post("/idea", userAuth, createIdea);
userRouter.get("/ideas", userAuth, getIdeas);
userRouter.get("/myideas", userAuth, getMyIdeas);
userRouter.delete("/delete-idea/:ideaId", userAuth, deleteIdea);


export default userRouter;