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
                <Link to="/donor" className="nav-btn">Donor</Link>
                <Link to="/blood-bank" className="nav-btn">Blood Bank</Link>
                <Link to="/request" className="nav-btn">Request</Link>
                <button className="nav-btn signout-btn" onClick={handleSignOut}>Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
