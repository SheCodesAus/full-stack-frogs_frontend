import LoginForm from "../components/LoginForm"

function LoginPage() {
    return (
        <div
            style={{ // BACKGROUND STYLES
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #fdfce9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div
                style={{ // CARD STYLES
                    background: "rgba(255,255,255,0.85)",
                    padding: "40px",
                    borderRadius: "16px",
                    border: "3px solid #A8D8C4",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "0 4px 12px rgba(0,0,0,.1)",
                }}
            >
                <h2 style={{ textAlign: "center", color: "color: #555", marginBottom: "10px" }}>Welcome — we're here for you</h2>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
