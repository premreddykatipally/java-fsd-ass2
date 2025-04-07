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

        // Retrieve user data from local storage using same key pattern as SignUp
        const storedUser = JSON.parse(localStorage.getItem(`user_${email}`));

        // Validate credentials
        if (!storedUser) {
            setError("User not found");
        } else if (storedUser.password !== password) {
            setError("Invalid password");
        } else {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", email);
            alert("Login successful!");
            navigate("/Dashboard");
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
