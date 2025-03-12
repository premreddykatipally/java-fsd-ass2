import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Registration logic
        const userData = { name, email, password, bloodGroup, age, location };
        localStorage.setItem("user", JSON.stringify(userData)); // Store user details
        localStorage.setItem("isAuthenticated", "true"); // Set authentication state
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
                <input
                    type="text"
                    placeholder="Enter your blood group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    list="bloodGroupOptions"
                    required
                />
                <datalist id="bloodGroupOptions">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </datalist>
                <input
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
