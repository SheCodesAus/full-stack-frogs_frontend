import LoginForm from "../components/LoginForm";
import "./loginpage.css";

function LoginPage() {
    return (
        <div className="login-background">
            <div className="login-card">
                <h2 className="login-title">
                    Welcome — we're here for you
                </h2>

                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
