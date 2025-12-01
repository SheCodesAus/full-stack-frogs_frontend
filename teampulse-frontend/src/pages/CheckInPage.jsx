import { useNavigate } from 'react-router-dom';
import CheckInForm from "../components/CheckInForm.jsx";
import Logo from '../components/Logo.jsx';
import './CheckInPage.css';

function CheckInPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="checkin-page">
            <div className='checkin-header flex space-between align-center'>
                <div className='header-left flex align-center'>
                    <Logo size={290} />
                </div>
                <span onClick={handleLogout} className='logout-text'>
                    Logout
                </span>
            </div>
            <CheckInForm />
        </div>
    );
}

export default CheckInPage;