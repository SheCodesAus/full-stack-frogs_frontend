import LoginForm from "../components/LoginForm";
import "./loginpage.css";
import Logo from "../components/Logo";

function LoginPage() {
    return (
        <div className="login-background">
            <header className='header'><Logo size={290} /></header>

            <div className="login-card">
                <h2 className="login-title">Welcome — we're here for you</h2>

                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
