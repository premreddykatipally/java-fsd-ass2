import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import logo from './logo.png';

const Header = () => {
    const navigate = useNavigate();
    // const location = useLocation(); // Get the current location

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize as false

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const authState = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(authState === "true" && user !== null); // Update state based on local storage
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Remove only the authentication state
        setIsAuthenticated(false); // Update state to reflect logout
        navigate("/login"); // Redirect to login page
    };

    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Red Cross Logo" />
                <a href="/">Home</a>
                <Link to="/Dashboard">Dashboard</Link>


            </div>
            <nav>
                <div className="auth-buttons">
                    {isAuthenticated ? ( // Check if authenticated
                        <div className="user-info">
                            <span>Welcome, {user.name}</span>
                            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
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
