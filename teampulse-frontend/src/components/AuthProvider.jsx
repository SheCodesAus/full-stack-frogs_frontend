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
                const res = await api.get("/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);   // expect { id, firstname, role }
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
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
};