import { useState } from "react";

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
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {error && (
                <div
                    style={{
                        background: "#ffe5e5",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ffb3b3",
                        color: "#d40000",
                        fontSize: "14px",
                    }}
                >
                    {error}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="you@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="1234"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: "10px",
                        background: "#d3d3d3",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none", 
                    }}
                />
            </div>

            <button
                type="submit"
                style={{
                    marginTop: "10px",
                    padding: "12px",
                    background: "linear-gradient(to right, #0d9488, #A8D8C4)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
