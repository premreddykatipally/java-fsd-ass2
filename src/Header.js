import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout, isAuthenticated } from './utils/auth';
import logo from './logo.png';

const Header = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    const handleLogout = async () => {
        await logout();
        setAuthenticated(false);
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Red Cross Logo" />
                <a href="/">Home</a>
                <Link to="/Dashboard">Dashboard</Link>


            </div>
            <nav>
            <div className="auth-buttons">
                {authenticated ? (
                    <div className="user-info">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link to="/Login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                )}
            </div>
            </nav>
        </header>
    );
};

export default Header;
