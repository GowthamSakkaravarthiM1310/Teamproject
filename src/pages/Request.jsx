import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Request = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        hospitalName: '',
        hospitalAddress: '',
        bloodGroup: '',
        unit: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Blood Request Details:', formData);
        alert('Request Sent! (Check console for details)');
        // Logic to send data to backend would go here
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="content-area">
                <div className="glass-card">
                    <h2>Request Blood</h2>
                    <p className="subtitle">Fill in the details to request blood</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Patient Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter patient name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="hospitalName">Hospital Name</label>
                            <input
                                type="text"
                                id="hospitalName"
                                name="hospitalName"
                                placeholder="Enter hospital name"
                                value={formData.hospitalName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="hospitalAddress">Hospital Address</label>
                            <input
                                type="text"
                                id="hospitalAddress"
                                name="hospitalAddress"
                                placeholder="Enter hospital address"
                                value={formData.hospitalAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="bloodGroup">Blood Group</label>
                            <input
                                type="text"
                                id="bloodGroup"
                                name="bloodGroup"
                                placeholder="Enter blood group (e.g. O+)"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="unit">Units Required</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, unit: Math.max(1, Number(prev.unit) - 1) }))}
                                    className="nav-btn"
                                    style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 15px', fontSize: '1.2rem' }}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="unit"
                                    name="unit"
                                    value={formData.unit}
                                    readOnly={true} // Make it read-only if you only want buttons to control it, or allow typing but keep buttons too. Let's make it read-only for strict button control as "increment and decrement" implies.
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        margin: 0
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, unit: Number(prev.unit) + 1 }))}
                                    className="nav-btn"
                                    style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 15px', fontSize: '1.2rem' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="auth-btn">Send Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Request;
