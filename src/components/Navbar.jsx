import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Perform sign out logic here (clear tokens, etc.)
        navigate('/login');
    };

    return (
        <nav className="glass-navbar">
            <div className="nav-brand">Blood Link</div>
            <div className="nav-links">
                <Link to="/home" className="nav-btn">Home</Link>
                <button className="nav-btn">Donor</button>
                <button className="nav-btn">Blood Bank</button>
                <button className="nav-btn">Request</button>
                <button className="nav-btn signout-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
