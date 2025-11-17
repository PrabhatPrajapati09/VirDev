// backend/routes/connectionRouter.js
import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getIncomingRequests,
  getOutgoingRequests,
  getAcceptedConnections
} from "../controllers/connectionController.js";

const router = express.Router();

router.post("/send/:receiverId", userAuth, sendRequest);
router.put("/accept/:requestId", userAuth, acceptRequest);
router.put("/reject/:requestId", userAuth, rejectRequest);

router.get("/incoming", userAuth, getIncomingRequests);
router.get("/outgoing", userAuth, getOutgoingRequests);
router.get("/acceptedlist", userAuth, getAcceptedConnections);

export default router;
