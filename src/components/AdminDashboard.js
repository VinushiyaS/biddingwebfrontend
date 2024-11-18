import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalLeaders, setTotalLeaders] = useState(0);
    const [userRole, setUserRole] = useState(localStorage.getItem('role')); // Retrieve user role from local storage

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
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userRole]);

    return (
        <div
            className="container-fluid"
            style={{ backgroundColor: '#99EDC3', minHeight: '100vh', padding: '20px' }} // Added background color
        >
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar />
                </div>
                <div className="col-md-9">
                    <div
                        className="dashboard mt-4 p-4 rounded"
                        style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Added white background for content
                    >
                        <h2 className="text-dark">Admin Dashboard</h2>

                        {userRole === 'admin' ? (
                            <>
                                <div
                                    className="stats card mb-4 p-3"
                                    style={{ backgroundColor: '#e3fcec', color: '#333' }} // Light green card background
                                >
                                    <h5 className="card-title">Statistics</h5>
                                    <p>
                                        <strong>Total Users:</strong> {totalUsers}
                                    </p>
                                    <p>
                                        <strong>Total Leaders:</strong> {totalLeaders}
                                    </p>
                                </div>

                                <h3 className="mt-4">Users and Leaders Details</h3>
                                <div className="card mb-4 p-3">
                                    <h5 className="card-title">Users</h5>
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>{user.payment ? user.payment : 'Pending'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card mb-4 p-3">
                                    <h5 className="card-title">Leaders</h5>
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaders.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>{user.payment ? user.payment : 'Paid'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-danger">
                                You do not have the necessary permissions to view this dashboard.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
