import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAuth } from '../hooks/use-auth';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                window.localStorage.setItem("token", token);
                setAuth({ token });
                const userRes = await fetch(`${import.meta.env.VITE_API_URL}/me/`, {
                    headers: {
                        "Authorization": `Token ${token}`,
                    },
                });
                const userData = await userRes.json();

                setAuth({ token, user: userData });

                // is_staff
                if (userData.is_staff) {
                    navigate("/manager-dashboard");
                } else {
                    navigate("/checkin");
                }

            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="error-box">{error}</div>}

                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>
                <p className="switch-page-text">
                    Don't have an account? <a href="/signup">Sign up here</a></p>
            </form>
        </div>
    );
}

export default LoginForm;
