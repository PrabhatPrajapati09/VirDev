import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getConversation } from "../controllers/conversationController.js";

const router = express.Router();

router.get("/conversation/:otherUserId", userAuth, getConversation);

export default router;
