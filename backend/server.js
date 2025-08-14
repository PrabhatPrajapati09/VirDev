import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/userRouter.js";


const app = express();
const port = process.env.PORT || 8800;

connectDB();

const allowedOrigins = ["http://localhost:5173"]

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());
app.use(cookieParser());


//Api Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});