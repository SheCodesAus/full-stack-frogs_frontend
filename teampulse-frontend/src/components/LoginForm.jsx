import { useState } from "react";
import "./loginform.css"; 

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
            console.log("Logging in with:", { email, password });
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
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
    );
}

export default LoginForm;
