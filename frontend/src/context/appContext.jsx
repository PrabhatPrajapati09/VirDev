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

        useEffect(() => {
            getAuthState();
            getUserData();
        }, []);

        useEffect(() => {
            if (isLoggedin) getSuggestions();
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
                    getSuggestions
                }}
            >
                {props.children}
            </AppContext.Provider>
        );
    }
