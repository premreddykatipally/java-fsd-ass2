import React, { useState, useEffect } from 'react';

const Donate = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        bloodGroup: '',
        age: '',
        location: '',
        status: ''
    });

    const [isEditing, setIsEditing] = useState(false); // State to track edit mode

    useEffect(() => {
        const currentUserEmail = localStorage.getItem("currentUser");
        if (currentUserEmail) {
            const userData = JSON.parse(localStorage.getItem(`user_${currentUserEmail}`));
            setUser(userData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // Update user state
    };

    const handleSave = () => {
        if (user.status === 'inactive') {
            localStorage.removeItem(`user_${user.email}`);
            alert("User details removed!");
        } else {
            // Ensure status is set to active when saving (unless explicitly inactive)
            const updatedUser = { ...user, status: user.status || 'active' };
            localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
            setUser(updatedUser);
            alert("User details saved!");
        }
        setIsEditing(false);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h3>User Details</h3>
                    {isEditing ? (
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
                    ) : (
                        <div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Blood Group: {user.bloodGroup}</p>
                            <p>Age: {user.age}</p>
                            <p>Location: {user.location}</p>
                            <p>Status: {user.status}</p>
                            <p>Thank you for your willingness to donate!</p>

                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>No user details available.</p>
            )}
        </div>
    );
};

export default Donate;
