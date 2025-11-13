import { createContext, use, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export function AppContextProvider(props) {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
            data.success ? setIsLoggedin(true) : toast.error(data.message); 
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
            data.success ? setUserData(data.userData) : toast.error(data.message); 
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <AppContext.Provider value={{
            backendUrl,
            isLoggedin,
            setIsLoggedin,
            userData,
            setUserData,
            getUserData
        }}>
            {props.children}
        </AppContext.Provider>
    );
}
