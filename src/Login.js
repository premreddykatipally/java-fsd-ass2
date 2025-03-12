import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve user data from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Validate credentials
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("isAuthenticated", "true"); // Set authentication state
            alert("Login successful!");
            navigate("/"); // Redirect to home
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit">Login</button>

                {/* Signup Link */}
                <p className="signup-text">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
