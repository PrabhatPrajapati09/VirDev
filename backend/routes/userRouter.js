import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getSuggestions, getUserData } from "../controllers/userController.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { updateUserData } from "../controllers/userController.js";
import { createIdea, getIdeas, getMyIdeas, updateIdea, deleteIdea, expressInterest, getMyInterestedIdeas} from "../controllers/ideaController.js";
import upload from "../middleware/upload.js";
import { updateProfilePic } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.put("/update", verifyUser, updateUserData);
userRouter.get("/suggestions", userAuth, getSuggestions);
userRouter.post("/idea", userAuth, createIdea);
userRouter.get("/ideas", userAuth, getIdeas);
userRouter.get("/myideas", userAuth, getMyIdeas);
userRouter.put("/update-idea/:ideaId", userAuth, updateIdea);
userRouter.delete("/delete-idea/:ideaId", userAuth, deleteIdea);
userRouter.post("/profile-pic", userAuth, upload.single("profilePic"), updateProfilePic);
userRouter.post("/interest/:ideaId", userAuth, expressInterest);
userRouter.get("/my-interests", userAuth, getMyInterestedIdeas)




export default userRouter;