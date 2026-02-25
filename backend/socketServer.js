import { Server as IOServer } from "socket.io";
import jwt from "jsonwebtoken";
import Conversation from "./models/Conversation.js";

let io = null;
// Track online users: { userId: socketId }
const userSocketMap = {}; 

function parseCookies(cookieHeader) {
    if (!cookieHeader) return {};
    return Object.fromEntries(
        cookieHeader.split(";").map((c) => {
            const [key, ...val] = c.trim().split("=");
            return [key, decodeURIComponent(val.join("="))];
        })
    );
}

function verifyToken(socket) {
    try {
        const cookies = parseCookies(socket.handshake.headers.cookie);
        const token = cookies.token;
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

export function initSocket(server) {
    io = new IOServer(server, {
        cors: { origin: "http://localhost:5173", credentials: true },
    });

    io.on("connection", (socket) => {
        const decoded = verifyToken(socket);
        if (!decoded) {
            socket.disconnect();
            return;
        }

        const userId = decoded.id;
        
        // 1. Map User and Join Room
        userSocketMap[userId] = socket.id;
        socket.join(userId);

        // 2. Broadcast Online List
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // 3. Typing Relay
        socket.on("typing", ({ toUserId, typing }) => {
            io.to(toUserId).emit("typing", { from: userId, typing });
        });

        // 4. Private Message with Reply Mechanism
        socket.on("private-message", async ({ toUserId, text, replyToId }) => {
            try {
                if (!text || !text.trim()) return;

                // Find or create conversation
                let convo = await Conversation.findOne({ 
                    participants: { $all: [userId, toUserId] } 
                });

                if (!convo) {
                    convo = await Conversation.create({
                        participants: [userId, toUserId],
                        messages: [],
                    });
                }

                // If replying, fetch the specific message being referenced from the convo
                let replyData = null;
                if (replyToId) {
                    const originalMsg = convo.messages.id(replyToId);
                    if (originalMsg) {
                        replyData = {
                            text: originalMsg.text,
                            sender: originalMsg.sender,
                            _id: originalMsg._id
                        };
                    }
                }

                const newMsg = {
                    sender: userId,
                    receiver: toUserId,
                    text,
                    createdAt: new Date(),
                    replyTo: replyData // Attach the reply context
                };

                convo.messages.push(newMsg);
                await convo.save();

                const savedMessage = convo.messages[convo.messages.length - 1];

                // Emit to both sender and receiver
                io.to(toUserId).to(userId).emit("private-message", {
                    conversationId: convo._id.toString(),
                    message: savedMessage
                });

            } catch (err) {
                console.error("Message Error:", err);
            }
        });

        // 5. Cleanup on Disconnect
        socket.on("disconnect", () => {
            if (userId) {
                delete userSocketMap[userId];
                io.emit("getOnlineUsers", Object.keys(userSocketMap));
            }
        });
    });
}

export function getIO() {
    return io;
}