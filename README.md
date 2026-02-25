# 🚀 VirDev

> A Developer Networking & Collaboration Platform  
> Built with MERN + Socket.io

VirDev is a full-stack developer collaboration platform where developers can:

- Create professional profiles with skills
- Post categorized development ideas
- Discover ideas from other developers
- Express interest in ideas
- Send and manage connection requests
- Chat in real-time (only with accepted connections)
- Receive email notifications
- Track idea engagement analytics

This is a real-time developer collaboration ecosystem.

---

# 📌 Core Features

## 👤 Authentication
- Register / Login (JWT + HTTP-only cookies)
- Email verification with OTP
- Password reset via email
- Protected routes with middleware

## 🧑‍💻 Profile System
- Editable developer profile
- Skills normalization & matching
- Profile picture upload
- About section
- Idea creation & management

## 💡 Idea System
- Post idea with:
  - Category
  - Title
  - Description
- Browse ideas from other developers
- Express interest in ideas
- Auto-create connection request if not connected
- Track:
  - Interest count
  - Interested developers list
- Owner dashboard for idea engagement

## 🤝 Connection System
- Send connection request
- Accept / Reject request
- Incoming / Outgoing request tracking
- Duplicate prevention logic
- Email notifications on request

## 💬 Real-Time Messaging (Socket.io)
- One-to-one private chat
- Only between accepted connections
- Typing indicator
- Online/offline detection
- Conversation persistence in MongoDB
- Optimistic UI updates

## 📧 Email Notifications
- Welcome email
- OTP verification
- Password reset
- Connection request alert
- Idea interest notification

---

# 🏗️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Toastify
- Context API
- Socket.io-client

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Bcrypt (Password hashing)
- Socket.io (Real-time messaging)
- Nodemailer (Email service)

---

# 🧠 System Architecture
Frontend (React + Socket.io client)

|

|REST API + WebSockets

v

Backend (Express + Socket.io)

|

v

MongoDB


### Core Data Models

- **User**
- **Connection**
- **Conversation**
- **Ideas (Embedded inside User)**

---

# 📂 Project Structure
VirDev/

│

├── backend/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── socketServer.js

│ ├── server.js

│ └── config/

│

├── frontend/

│ ├── src/

│ │ ├── pages/

│ │ ├── components/

│ │ ├── context/

│ │ └── assets/

│ └── vite.config.js

│

└── README.md

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder:


PORT=8800

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

SENDER_EMAIL=your_verified_email

EMAIL_PASSWORD=your_email_password

FRONTEND_URL=http://localhost:5173

NODE_ENV=development


---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository


git clone https://github.com/yourusername/VirDev.git

cd VirDev


---

## 2️⃣ Backend Setup


cd backend
npm install
npm run dev


Backend runs on:

http://localhost:8800


---

## 3️⃣ Frontend Setup


cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


---

# 🔌 API Overview

## 🔐 Authentication

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/send-verify-otp

POST /api/auth/verify-email

POST /api/auth/reset-password


## 👤 User

GET /api/user/data

PUT /api/user/update

GET /api/user/suggestions


## 💡 Ideas

POST /api/user/create-idea

GET /api/user/ideas

GET /api/user/myideas

PUT /api/user/update-idea/:ideaId

DELETE /api/user/delete-idea/:ideaId

POST /api/user/express-interest/:ideaId


## 🤝 Connections

POST /api/connections/send/:receiverId

PUT /api/connections/accept/:requestId

PUT /api/connections/reject/:requestId

GET /api/connections/incoming

GET /api/connections/outgoing

GET /api/connections/acceptedlist


## 💬 Messaging

GET /api/messages/conversation/:userId


---

# 🔥 Real-Time Events (Socket.io)

### Client → Server
- `private-message`
- `typing`

### Server → Client
- `private-message`
- `typing`
- `user-online`
- `user-offline`

---

# 🧪 How to Test

1. Create two accounts
2. Verify both accounts
3. Post an idea from Account A
4. Express interest from Account B
5. Accept connection
6. Start chat
7. Observe real-time updates
8. Check email notifications

---

# 📈 Scalability Considerations

- Indexed conversation participants
- Embedded ideas for faster read performance
- Optimistic UI updates for chat
- Socket room-based architecture
- Duplicate connection prevention
- MongoDB aggregation for idea feeds

---

# 🛡️ Security Measures

- JWT stored in HTTP-only cookies
- Password hashing with bcrypt
- Route protection middleware
- ObjectId validation
- Duplicate request protection
- Ownership validation for updates/deletes

---

# 🎯 Future Improvements

- Group collaboration rooms
- Idea comment threads
- Notification center
- AI-based developer matching
- Redis adapter for scalable sockets
- Pagination for ideas & chat
- Media/file sharing in chat
- Push notifications

---

# 📜 License

MIT License

---

# 👤 Author

**Prabhat Prajapati**  
Frontend Developer  

---

# 💡 Final Note

VirDev is not just a CRUD application.

It combines:

- Authentication & Authorization
- Real-time communication
- Email workflows
- Connection state management
- Idea collaboration mechanics

This project demonstrates production-level full-stack architecture using the MERN stack with real-time capabilities.