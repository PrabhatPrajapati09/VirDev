import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/userRouter.js";
import connectionRouter from "./routes/connectionRouter.js";
import http from "http";
import { initSocket } from "./socketServer.js";
import conversationRouter from "./routes/conversationRouter.js";

const app = express();
const port = process.env.PORT || 8800;

// create HTTP server
const server = http.createServer(app);

// connect DB
connectDB();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: frontendUrl,
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/connections", connectionRouter);
app.use("/api/messages", conversationRouter);

// initialize socket.io
initSocket(server);

// ----------------------------------------
// START SERVER — ONLY THIS, NOTHING ELSE
// ----------------------------------------
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
