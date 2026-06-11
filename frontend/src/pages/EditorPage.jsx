import React, { useEffect, useRef, useState, useContext } from 'react';
import Client from '../components/devroom/Client';
import Editor from '../components/devroom/Editor';
import ACTIONS from '../utils/Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SocketContext } from '../context/socketContext';
import { FaComments, FaTimes } from 'react-icons/fa';
import Chat from './Chat';
import VerificationGuard from '../components/auth/VerificationGuard';
import { AppContext } from '../context/appContext';


const EditorPage = () => {

    const { userData } = useContext(AppContext);
    const { socket } = useContext(SocketContext);

    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const [chats, setChats] = useState([]);

    // 3. Keep socketRef updated for your <Editor /> component so you don't have to rewrite it
    useEffect(() => {
        socketRef.current = socket;
    }, [socket]);

    useEffect(() => {
        // 4. Wait for the socket to be initialized by the Context Provider
        if (!socket) return;

        const handleErrors = (e) => {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            reactNavigator('/');
        };

        const init = () => {
            socket.on('connect_error', handleErrors);
            socket.on('connect_failed', handleErrors);

            socket.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socket.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined the room`);
                }
                setClients(clients);
                socket.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId
                });
            });

            socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setClients((prev) => {
                    return prev.filter((client) => client.socketId !== socketId);
                });
            });
        };

        init();

        // 5. Cleanup on unmount
        return () => {
            socket.off('connect_error', handleErrors);
            socket.off('connect_failed', handleErrors);
            socket.off(ACTIONS.JOINED);
            socket.off(ACTIONS.DISCONNECTED);

            // IMPORTANT: Because the socket is now global, navigating away 
            // no longer triggers a hard disconnect. You should emit a custom 
            // LEAVE event here so your backend knows this user exited the room.
            socket.emit(ACTIONS.LEAVE, { roomId, username: location.state?.username });
        };

    }, [socket, roomId, location.state?.username, reactNavigator]);

    async function copyRoomID() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.log(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/home');
    }

    if (!location.state) {
        return <Navigate to="/home" />
    }

    return (
        <>
            <div className='mainWrapper grid grid-cols-[240px_1fr] h-screen w-full overflow-hidden'>

                <div className="aside h-full bg-[#1c1e29] p-4 text-white flex flex-col">
                    <div className="asideInner flex-1">
                        <div className="logo h-15 text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#bd93f9] to-[#7bc6cc] border-b border-[#bd93f9] pb-2.5">DevRoom</div>
                        <h3 className="my-4 text-lg font-semibold">Connected</h3>

                        <div className="clientlist flex items-center flex-wrap gap-6 overflow-y-auto max-h-[calc(100vh-250px)]">
                            {clients.map((client) => (
                                <Client key={client.socketId} username={client.username} />
                            ))}
                        </div>
                    </div>
                    <button onClick={copyRoomID} className='btncpy border-0 p-2.5 rounded-xl text-[16px] cursor-pointer transition ease-in-out delay-50 duration-300 copyBtn font-bold bg-[#fff] text-black'>Copy ROOM ID</button>
                    <button onClick={leaveRoom} className='btnleave border-0 p-2.5 rounded-xl text-[16px] cursor-pointer transition ease-in-out delay-50 duration-300 leaveBtn mt-5 bg-[#bd93f9] hover:-translate-y-1 hover:bg-[#7bc6cc] text-black font-bold'>Leave</button>
                </div>

                <div className="editorWrapper h-full bg-[#282a36] overflow-y-auto ">
                    <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => { codeRef.current = code }} />
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
            </div>
        </>
    );
};

export default EditorPage;