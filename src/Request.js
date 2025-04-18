import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './Request.css';

const Request = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            // First test DB connection
            const dbTest = await axios.get('http://localhost:5000/api/test-db');
            console.log('Database test:', dbTest.data);

            // Then fetch users
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No authentication token found. Please login first.');
            }

            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Users response:', response.data);

            const users = response.data.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                bloodGroup: user.bloodGroup,
                age: user.age,
                location: user.location,
                status: user.status,
                timestamp: user.timestamp || user.createdAt
            }));
            setAllUsers(users);
            setFilteredUsers(users);
        } catch (err) {
            setError(err.response?.data?.message || 
                   err.message || 
                   'Failed to fetch users. Please try again later.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        const results = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, allUsers]);

    const refreshUsers = () => {
        fetchAllUsers();
    };

    return (
        <div className="request-container">
            <h2>All Blood Donors</h2>
            
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by name, blood group or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={refreshUsers} className="refresh-btn">
                    {loading ? 'Refreshing...' : 'Refresh List'}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {filteredUsers.length > 0 ? (
                <div className="users-grid">
                    {filteredUsers.map((donor) => (
                        <div key={donor.id} className="donor-card" onClick={() => {
                            setSelectedUser(donor);
                            setIsModalOpen(true);
                        }}>
                            <div className="donor-header">
                                <h3>{donor.name}</h3>
                                <span className={`blood-group ${donor.bloodGroup.replace('+', 'pos').replace('-', 'neg')}`}>
                                    {donor.bloodGroup}
                                </span>
                            </div>
                            <div className="donor-details">
                                <p><strong>Location:</strong> {donor.location}</p>
                                <p><strong>Age:</strong> {donor.age}</p>
                                <p><strong>Status:</strong> {donor.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    {searchTerm ? 
                        'No matching donors found' : 
                        'No donors available in the system'}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="user-modal"
                overlayClassName="modal-overlay"
            >
                {selectedUser && (
                    <div className="modal-content">
                        <h3>{selectedUser.name}'s Details</h3>
                        <div className="modal-details">
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Blood Group:</strong> {selectedUser.bloodGroup}</p>
                            <p><strong>Age:</strong> {selectedUser.age}</p>
                            <p><strong>Location:</strong> {selectedUser.location}</p>
                            <p><strong>Status:</strong> {selectedUser.status}</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="close-modal"
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Request;
