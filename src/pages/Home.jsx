import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <div className="content-area">
                <div className="glass-card welcome-card">
                    <h1>Welcome</h1>
                    <p>Select an option from the navigation bar to proceed.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
