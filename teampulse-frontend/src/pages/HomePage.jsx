import { useNavigate } from 'react-router-dom';
import './HomePage.css';

import Logo from '../components/Logo'
import Button from '../components/ButtonComponent';

function HomePage() {
    const navigate = useNavigate();

    return (
        <section className='landing'>
            <header className='header'>
                <Logo size={290} />
            </header>
            <div className='tagline'>
                <h3>Take a breath, </h3>
                <h3>You’re in a safe space. </h3>
            </div>
            <Button text={'LOGIN'} width={'50vw'} to="/login" />
            <Button text={'SIGNUP'} width={'50vw'} to="/login" />

        </section >
    )
}

export default HomePage;