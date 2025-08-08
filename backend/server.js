import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 8800;

connectDB();

app.use(cors({credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});