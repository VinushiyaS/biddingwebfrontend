// src/components/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <h3 className="sidebar-title">Admin Dashboard</h3>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link to="/admin-sidebar" className="sidebar-link">Dashboard Overview</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/users" className="sidebar-link">Users</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/auctions" className="sidebar-link">Manage Auctions</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/reports" className="sidebar-link">Reports</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/settings" className="sidebar-link">Settings</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
