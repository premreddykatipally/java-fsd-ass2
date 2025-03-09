import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Check login state

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Remove login state
        navigate("/Login"); // Redirect to login page
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Red Cross Logo" />
            </div>
            <nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/donation-guidelines">Donation Guidelines</a></li>
    <li><a href="/faqs">FAQs</a></li>
  </ul>
  <div className="auth-buttons">
    <button><a href="/login">Login</a></button>
    <button><a href="/signup">SignUp</a></button>
  </div>
</nav>

        </header>
    );
};<br/>

export default Header;
