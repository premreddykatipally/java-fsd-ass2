import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleRequest = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            alert(`User Details: ${userData.name}, ${userData.email}`);
            navigate('/Request');
        } else {
            alert("No user details found.");
        }
    };

    const handleDonate = () => {
        navigate('/donate'); // Redirect to the Donate.js page
    };

    return (
        <div>
            <main>
                <h1>Donate Hope</h1><br />
                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleDonate}>Donate</button>
                    <button onClick={handleRequest}>Request</button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
