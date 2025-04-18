import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.accessToken);
                // Store current user email in localStorage for Donate.js usage
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));
                navigate("/dashboard");
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            console.error("Login error:", err);
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
