import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/use-auth.js';
import Logo from "./Logo";
import './NavBar.css';


function NavBar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <>
            <div className="navbar flex space-between">
                <Logo size={220} />
                <span onClick={handleLogout} className='logout-text'>
                    Logout
                </span>
            </div>
            <Outlet />
        </>
    )
}
export default NavBar;