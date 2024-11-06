import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalLeaders, setTotalLeaders] = useState(0);

    // Fetch all data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch leaders, users, and stats
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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    return (
        <div className="dashboard">
            <h2>Admin Dashboard</h2>
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
                        <th>Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {[...users, ...leaders].map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.subscription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

          
            
               
                  
            </div>
        
    );
};

export default AdminDashboard;
