import { createContext, useState, useEffect } from "react";

// Here we create the Context
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: window.localStorage.getItem("token"),
        user:null,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/me/`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );

                setAuth((prev) => ({
                    ...prev,
                    user: res.data,
                },console.log('consologing the'+user)));            
            } catch (err) {
                console.error("Failed to restore user:", err);
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
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