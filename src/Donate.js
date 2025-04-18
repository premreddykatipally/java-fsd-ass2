import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donate = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        bloodGroup: '',
        age: '',
        location: '',
        status: ''
    });

    const [isEditing, setIsEditing] = useState(true); // Show form by default

    useEffect(() => {
        const currentUserString = localStorage.getItem("currentUser");
        if (currentUserString) {
            try {
                const currentUser = JSON.parse(currentUserString);
                setUser({
                    name: currentUser.name || '',
                    email: currentUser.email || '',
                    bloodGroup: currentUser.bloodGroup || '',
                    age: currentUser.age || '',
                    location: currentUser.location || '',
                    status: currentUser.status || ''
                });
            } catch (err) {
                console.error("Failed to parse current user data:", err);
            }
        } else {
            console.warn("No current user found in localStorage.");
            // Optionally, redirect to login or show a message
            // window.location.href = '/login';
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // Update user state
    };

    const handleSave = async () => {
        try {
            const updatedUser = { ...user, status: user.status || 'active' };
            
            if (updatedUser.status === 'inactive') {
                await axios.delete(`http://localhost:5000/api/users/${user.email}`);
                localStorage.removeItem("currentUser");
                alert("Account deactivated successfully!");
                window.location.href = '/';
            } else {
                const response = await axios.put(
                    `http://localhost:5000/api/users/${user.email}`,
                    updatedUser
                );
                
                if (response.data.success) {
                    setUser(updatedUser);
                    alert("User details updated successfully!");
                }
            }
        } catch (err) {
            console.error("Error saving user data:", err);
            alert("Failed to save user details. Please try again.");
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h3>User Details</h3>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        /><br></br><br></br>

                        <label>Blood Group:</label>
                        <select
                            name="bloodGroup"
                            value={user.bloodGroup}
                            onChange={handleChange}
                        >
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select><br></br><br></br>

                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={user.age}
                            onChange={handleChange}
                        />

                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={user.location}
                            onChange={handleChange}
                        />

                        <label>Status:</label>
                        <select
                            name="status"
                            value={user.status}
                            onChange={handleChange}
                        >
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <button onClick={handleSave}>Submit Donation</button>
                    </div>
                </div>
            ) : (
                <p>No user details available.</p>
            )}
        </div>
    );
};

export default Donate;
