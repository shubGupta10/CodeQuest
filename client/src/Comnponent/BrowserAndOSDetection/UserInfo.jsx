import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginHistory.css'; 

const LoginHistory = () => {
    const [loginHistory, setLoginHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const userProfile = JSON.parse(localStorage.getItem('Profile'));
                if (!userProfile || !userProfile.result._id) {
                    console.error('User profile or ID not found in localStorage');
                    return;
                }
                const userId = userProfile.result._id;
                const response = await axios.get(`http://localhost:5000/user/login-history/${userId}`);
                setLoginHistory(response.data);
            } catch (error) {
                console.error('Error fetching login history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoginHistory();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="title">Login History</h2>
            <div className="table-container">
                <table className="login-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Browser</th>
                            <th>OS</th>
                            <th>Device</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginHistory.map((login, index) => (
                            <tr key={index}>
                                <td>{new Date(login.Timestamp).toLocaleString()}</td>
                                <td>{login.browser}</td>
                                <td>{login.os}</td>
                                <td>{login.device}</td>
                                <td>{login.ipAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoginHistory;
