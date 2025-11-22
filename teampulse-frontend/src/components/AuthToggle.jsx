import { useNavigate } from "react-router-dom";
import "./AuthToggle.css";

function AuthToggle({ current }) {
    const navigate = useNavigate();

    return (
        <div className="auth-toggle-container">
            <div className="auth-toggle-pill">

                <button
                    className={`toggle-option ${current === "login" ? "active" : ""}`}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

                <button
                    className={`toggle-option ${current === "signup" ? "active" : ""}`}
                    onClick={() => navigate("/signup")}
                >
                    Signup
                </button>

                {/* slider */}
                <span 
                    className={`toggle-slider ${current === "signup" ? "right" : ""}`}
                />
            </div>
        </div>
    );
}

export default AuthToggle;
