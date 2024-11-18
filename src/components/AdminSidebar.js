import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar bg-light p-4 border-end" style={{ width: '250px', height: '100vh' }}>
            <h3 className="sidebar-title text-dark mb-4">Admin Dashboard</h3>
            <nav className="sidebar-nav">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin-sidebar" className="nav-link sidebar-link text-dark">
                            Dashboard Overview
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-sidebar" className="nav-link sidebar-link text-dark">
                            Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-sidebar" className="nav-link sidebar-link text-dark">
                            Manage Auctions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-sidebar" className="nav-link sidebar-link text-dark">
                            Reports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin-sidebar" className="nav-link sidebar-link text-dark">
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
