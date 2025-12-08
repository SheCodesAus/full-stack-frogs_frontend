import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthProvider';
import CheckInForm from "../components/CheckInForm.jsx";
import './CheckInPage.css';

function CheckInPage() {
    const navigate = useNavigate();
    const { auth, loading } = useContext(AuthContext);

    useEffect(() => {
        if (loading) return;


        if (!auth.token || !auth.user) {
            navigate('/login');
            return;
        }


        if (auth.user.role === 'manager') {
            navigate('/dashboard');
            return;
        }
    }, [auth, loading, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div className="checkin-page"><p>Loading...</p></div>;
    }

    if (auth.user?.role === 'manager') {
        return null;
    }

    return (
        <div className="checkin-page">
            <div className='checkin-header flex space-between align-center'>
            </div>
            <CheckInForm />
        </div>
    );
}

export default CheckInPage;