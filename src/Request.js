import React, { useState, useEffect } from 'react';

const Request = () => {
    const [signedUpUsers, setSignedUpUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Properly defined inside the component
    const fetchLocalStorageUsers = () => {
        try {
            const users = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('user_')) {
                    const userData = JSON.parse(localStorage.getItem(key));
                    if (userData) {
                        users.push({
                            name: userData.name,
                            email: userData.email,
                            bloodGroup: userData.bloodGroup,
                            age: userData.age,
                            location: userData.location,
                            status: userData.status,
                            timestamp: userData.timestamp
                        });
                    }
                }
            }
            users.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setSignedUpUsers(users);
        } catch (err) {
            setError('Error loading user data');
            console.error('LocalStorage error:', err);
        }
    };

    useEffect(() => {
        fetchLocalStorageUsers();
    }, []);

    const refreshUsers = () => {
        setLoading(true);
        setError(null);
        fetchLocalStorageUsers();
        setLoading(false);
    };

    return (
        <div>
            <h2>Active Blood Donors</h2>
            <button onClick={refreshUsers} style={{marginBottom: '20px'}}>
                Refresh Users
            </button>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            {signedUpUsers.length > 0 ? (
                signedUpUsers.map((donor, index) => (
                    <div key={index} className="donor-card">
                        <h3>Donor Details</h3>
                        <p>Name: {donor.name}</p>
                        <p>Email: {donor.email}</p>
                        <p>Blood Group: {donor.bloodGroup}</p>
                        <p>Age: {donor.age}</p>
                        <p>Location: {donor.location}</p>
                        <p>Status: {donor.status}</p>
                    </div>
                ))
            ) : (
                <p>No active donors available.</p>
            )}
        </div>
    );
};

export default Request;