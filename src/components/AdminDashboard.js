import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalLeaders, setTotalLeaders] = useState(0);
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));  // Retrieve user role from local storage

    // Fetch all data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch leaders, users, and stats only if the user is an admin
                if (userRole === 'admin') {
                    const leadersResponse = await fetch('http://localhost:5000/api/admin/leaders');
                    const leadersData = await leadersResponse.json();

                    const usersResponse = await fetch('http://localhost:5000/api/admin/users');
                    const usersData = await usersResponse.json();

                    const statsResponse = await fetch('http://localhost:5000/api/admin/stats');
                    const statsData = await statsResponse.json();

                    setLeaders(leadersData);
                    setUsers(usersData);
                    setTotalUsers(statsData.totalUsers);
                    setTotalLeaders(statsData.totalLeaders);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [userRole]);

    return (
        <div className="dashboard">
            <h2>Admin Dashboard</h2>
            {userRole === 'admin' ? (
                <>
                    <div className="stats">
                        <p>Total Users: {totalUsers}</p>
                        <p>Total Leaders: {totalLeaders}</p>
                    </div>

                    <h3>Users and Leaders Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Payment</th>
                                <th>Verification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...users ].map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.payment ? user.payment : 'N/A'}</td>
                                    <td>{user.verified ? 'Verified' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            {[...leaders].map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.payment ? user.payment : 'A'}</td>
                                    <td>{user.verified ? 'Verified' : 'Paid'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>You do not have the necessary permissions to view this dashboard.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
