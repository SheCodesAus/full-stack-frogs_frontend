import { useState } from "react";
import "./loginform.css"; 
import AuthToggle from "./AuthToggle.jsx";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
        // API call
        const response = await fetch("https://your-api.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // send email & password
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful:", data);
        
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
            <AuthToggle current="login" />

            <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="error-box">{error}</div>}

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="you@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
            </form>
        </div>
    );
}

export default LoginForm;

