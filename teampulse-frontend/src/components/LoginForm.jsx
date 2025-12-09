import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAuth } from "../hooks/use-auth";


function getISOWeekNumber(date = new Date()) {
    const target = new Date(date.valueOf());

    // ISO week date: Monday = 1, Sunday = 7
    const dayNr = (date.getDay() + 6) % 7;

    // set target to nearest Thursday (current date + 4 - dayNr)
    target.setDate(target.getDate() - dayNr + 3);

    // First Thursday of the ISO year
    const firstThursday = new Date(target.getFullYear(), 0, 4);

    // Calculate full weeks to nearest Thursday
    const weekNumber = 1 + Math.round(
        ((target - firstThursday) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7
    );

    return weekNumber;
}

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api-token-auth/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }

            const token = data.token;

            // Save token
            window.localStorage.setItem("token", token);

            // Update context with token
            setAuth({ token });

            const res = await fetch(`${import.meta.env.VITE_API_URL}/me/`, {
                headers: { Authorization: `Token ${token}` },
            });

            const userData = await res.json();


            setAuth({ token, user: userData });

            if (userData.is_staff) {
                navigate("/manager-dashboard");
                return;
            }


            const now = new Date();
            const weekIndex = getISOWeekNumber(now);
            const paddedWeek = String(weekIndex).padStart(2, "0");
            const currentYearWeek = Number(`${now.getFullYear()}${paddedWeek}`);
            console.log("👉 CURRENT YEAR WEEK:", `${now.getFullYear()}${paddedWeek}`);

            const hasCheckedIn = userData.logged_pulses?.some(
                (pulse) => pulse.year_week === currentYearWeek
            );

            if (hasCheckedIn) {
                navigate("/user-dashboard");   // Already submitted this week
            } else {
                navigate("/checkin");          // Needs to submit
            }

        } catch (err) {
            console.error(err);
            setError("Login failed — please try again.");
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>

                <p className="switch-page-text">
                    Don't have an account? <a href="/signup">Sign up here</a>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
