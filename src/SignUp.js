import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("active");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userData = { 
                name, 
                email, 
                password, 
                bloodGroup, 
                age, 
                location, 
                status,
                timestamp: new Date().toISOString() 
            };

            const response = await axios.post('http://localhost:5000/api/users/register', userData, { withCredentials: true });
            
            if (response.data.success) {
                localStorage.setItem("currentUser", email);
                localStorage.setItem("isAuthenticated", "true");
                alert("Signup successful! Please log in.");
                navigate("/login");
            } else {
                setError(response.data.message || "Registration failed");
            }
    } catch (err) {
        const errorMsg = err.response?.data?.message || 
                        err.message || 
                        "Registration failed. Please try again.";
        setError(errorMsg);
        console.error("Signup error details:", {
            error: err,
            response: err.response,
            request: err.config
        });
        }
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
                
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit">Sign Up</button>
                
                {error && <p className="error-message">{error}</p>}

                {/* Login Link */}
                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
