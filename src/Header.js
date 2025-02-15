import React from 'react';
import logo from './logo.png'; // Import the logo

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src={logo.png} alt="Red Cross Logo" /> {/* Use the imported logo */}
            </div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Donation Guidelines</a></li>
                    <li><a href="#">FAQs</a></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button>Login</button>
                <button>Sign Up</button>
            </div>
        </header>
    );
};

export default Header;
