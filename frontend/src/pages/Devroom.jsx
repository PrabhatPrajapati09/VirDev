import React, { use, useState } from 'react'
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import { FaComments, FaTimes } from 'react-icons/fa';
import VerificationGuard from '../components/auth/VerificationGuard';
import Chat from './Chat';


const Devroom = () => {

    const { userData } = useContext(AppContext);

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState(`${userData?.name}`);
    const [openChat, setOpenChat] = useState(false);
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuid();
        setRoomId(id);
        toast.success('Created a new room');
    }

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Room ID & username is required');
            return;
        }
        // Join room
        navigate(`/devroom/editor/${roomId}`, {
            state: {
                username
            }
        });
        toast.success('Joined a room');
    }

    const handleEnterInput = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    }


    return (
        <div className='homePageWrapper flex justify-center items-center h-screen text-white bg-[#1c1e29]'>
            <div className="formWrapper bg-[#282a36] p-5 rounded-2xl w-[400px] max-w-[90%]">
                <h1 className='logo h-20 text-7xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#bd93f9] to-[#7bc6cc]'>DevRoom</h1>
                <h4 className='mb-5 mt-0'>Paste invitation Room ID</h4>
                <div className="inputGroup flex flex-col ">
                    <input
                        type="text"
                        className="inputBox p-2.5 rounded-xl outline-0 border-0 mb-3.5 bg-[#eee] font-bold text-[16px] text-black"
                        placeholder="Room ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleEnterInput}
                    />
                    <input
                        type="text"
                        className="inputBox p-2.5 rounded-xl outline-0 border-0 mb-3.5 bg-[#eee] font-bold text-[16px] text-black"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleEnterInput}
                    />
                    <button onClick={joinRoom} className='btnjoin border-0 p-2.5 rounded-xl text-[16px] cursor-pointer transition ease-in-out delay-50 duration-300 joinBtn w-28 bg-[#bd93f9] hover:-translate-y-1 hover:bg-[#7bc6cc] ml-auto'>Join</button>
                    <span className='createInfo m-auto mt-2 '>If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className='createNewBtn text-[#bd93f9] border-b transition ease-in-out delay-50 duration-300 hover:text-[#7bc6cc]'>new room</a>
                    </span>
                </div>
            </div>

            {/* FLOATING MESSAGE BUTTON */}
            <button
                className="fixed bottom-6 right-6 bg-fuchsia-600 text-white p-4 rounded-full shadow-lg text-2xl z-40"
                onClick={() => setOpenChat(true)}
            >
                <FaComments />
                {chats.reduce((acc, chat) => acc + (0), 0) > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-500 h-4 w-4 rounded-full border-2 border-slate-950"></span>
                )}
            </button>

            {/* CHAT SLIDE-UP */}
            {openChat && (
                <div className="fixed bottom-0 left-0 w-full h-[100vh] bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-slideUp border-t border-white/10">
                    <button className="text-white text-2xl absolute top-4 right-4 z-10" onClick={() => setOpenChat(false)}><FaTimes /></button>
                    <VerificationGuard isVerified={userData?.isUserVerified} title="Verify Your Account to see messages">

                        <Chat />
                    </VerificationGuard>
                </div>
            )}

            <footer className='fixed bottom-0 m-4'>
                <h4>Built by &nbsp;
                    <a href="https://github.com/PrabhatPrajapati09" className='text-[#bd93f9] border-b transition ease-in-out delay-50 duration-300 hover:text-[#7bc6cc]'>Prabhat</a>
                </h4>
            </footer>
        </div>
    )
}

export default Devroom
