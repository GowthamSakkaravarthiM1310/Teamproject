import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const userRole = localStorage.getItem('userRole'); // 'admin' or 'user'

    const handleSignOut = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="glass-navbar">
            <div className="nav-brand">Blood Link</div>
            <div className="nav-links">
                <Link to="/home" className="nav-btn">Home</Link>

                {/* Admin Only: Donor Page */}
                {userRole === 'admin' && (
                    <Link to="/donor" className="nav-btn">Donor</Link>
                )}

                <Link to="/blood-bank" className="nav-btn">Blood Bank</Link>

                {/* User Only: Request Page */}
                {userRole === 'user' && (
                    <Link to="/request" className="nav-btn">Request</Link>
                )}

                <button className="nav-btn signout-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
