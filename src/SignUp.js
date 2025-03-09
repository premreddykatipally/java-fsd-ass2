import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Dummy registration logic (Replace with API call)
        const userData = { name, email, password };
        localStorage.setItem("user", JSON.stringify(userData)); // Store user details
        alert("Signup successful! Please log in.");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="signup-container">
            <form className="signup-box" onSubmit={handleSignup}>
                <h2>Sign Up</h2>
                
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                
                <button type="submit">Sign Up</button>

                {/* Login Link */}
                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
