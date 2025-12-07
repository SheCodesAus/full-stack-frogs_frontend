import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Here we create the Context
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem("token"),
        user: null,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadUser() {
            if (!auth.token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/me/`,
                    {
                        headers: {
                            Authorization: `Token ${auth.token}`,
                        },
                    }
                );
                setAuth((prev) => ({
                    ...prev,
                    user: res.data,
                }));
            } catch (err) {
                console.error("Failed to restore user:", err);
                localStorage.removeItem("token");
                setAuth({
                    token: null,
                    user: null,
                });
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [auth.token]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {props.children}
        </AuthContext.Provider>
    );
};