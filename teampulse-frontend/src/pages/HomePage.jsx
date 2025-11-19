import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import Logo from '../components/Logo'

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Logo size={300} />
            <div className='welcoming-content'>
                <div className='tagline'>
                    <h3>Take a breath, </h3>
                    <h3>You’re in a safe space. </h3>
                </div>
                <div className='direct-btns'>
                    <div>
                        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                    </div>
                    <div>
                        <button className="signup-btn" onClick={() => navigate('/signup')}>Signup</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;