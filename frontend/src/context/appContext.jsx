import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export function AppContextProvider(props) {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [connections, setConnections] = useState([]);


    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setIsLoggedin(true);
            } else {
                setIsLoggedin(false);
            }
        } catch (error) {
            setIsLoggedin(false);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);
            if (data.success) {
                setUserData(data.userData);
            } else {
                setUserData(null);
            }
        } catch (error) {
            setUserData(null);
        }
    };

    const getSuggestions = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/suggestions`, {
                withCredentials: true
            });
            if (data.success) {
                setSuggestions(data.suggestions);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getReceivedRequests = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/connections/incoming`, { withCredentials: true });
            if (data.success) setReceivedRequests(data.requests);
        } catch (error) {
            console.error(error);
        }
    };

    const getSentRequests = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/connections/outgoing`, { withCredentials: true });
            if (data.success) setSentRequests(data.requests);
        } catch (error) {
            console.error(error);
        }
    };

    const getConnections = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/connections/acceptedlist`, { withCredentials: true });
            if (data.success) setConnections(data.connections);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getAuthState();
        getUserData();
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            getSuggestions();
            getReceivedRequests();
            getSentRequests();
            getConnections();
        }
    }, [isLoggedin]);


    return (
        <AppContext.Provider
            value={{
                backendUrl,
                isLoggedin,
                setIsLoggedin,
                userData,
                setUserData,
                getUserData,
                suggestions,
                getSuggestions,
                receivedRequests,
                getReceivedRequests,
                sentRequests,
                getSentRequests,
                connections,
                getConnections
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
