import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Request = ({ bloodStock, onRequest }) => {
    const [requestData, setRequestData] = useState({
        patientName: '',
        bloodGroup: '',
        units: '',
        hospitalName: '',
        contactNumber: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const requestedGroup = requestData.bloodGroup;
        const requestedUnits = Number(requestData.units);

        // Find stock for the requested group
        const stockItem = bloodStock.find(item => item.group === requestedGroup);

        if (!stockItem) {
            setMessage('Blood group not available');
            setMessageType('error');
            return;
        }

        if (stockItem.units === 0) {
            setMessage('Blood group not available (Out of Stock)');
            setMessageType('error');
            return;
        }

        if (requestedUnits > stockItem.units) {
            setMessage('Insufficient blood units');
            setMessageType('error');
            return;
        }

        // Proceed with request
        // Proceed with request
        if (onRequest) {
            onRequest({
                ...requestData,
                units: requestedUnits
            });
        }

        setMessage('Blood request submitted successfully');
        setMessageType('success');

        // Reset form
        setRequestData({
            patientName: '',
            bloodGroup: '',
            units: '',
            hospitalName: '',
            contactNumber: ''
        });
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="content-area">
                <div className="glass-card" style={{ maxWidth: '500px' }}>
                    <h2>Request Blood</h2>
                    <p className="subtitle">Submit a request for blood units</p>

                    {message && (
                        <div className="eligibility-message" style={{
                            padding: '10px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            background: messageType === 'error' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)',
                            color: messageType === 'error' ? '#ff6b6b' : '#4ade80',
                            border: `1px solid ${messageType === 'error' ? '#ff6b6b' : '#4ade80'}`
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleRequestSubmit}>
                        <div className="input-group">
                            <label>Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                value={requestData.patientName}
                                onChange={handleChange}
                                required
                                placeholder="Patient Name"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="input-group">
                                <label>Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={requestData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="" style={{ color: 'black' }}>Select Group</option>
                                    {bloodStock.map(s => s.group).map(bg => (
                                        <option key={bg} value={bg} style={{ color: 'black' }}>{bg}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Units Required</label>
                                <input
                                    type="number"
                                    name="units"
                                    value={requestData.units}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Units"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Hospital Name</label>
                            <input
                                type="text"
                                name="hospitalName"
                                value={requestData.hospitalName}
                                onChange={handleChange}
                                required
                                placeholder="Hospital Name"
                            />
                        </div>

                        <div className="input-group">
                            <label>Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={requestData.contactNumber}
                                onChange={handleChange}
                                required
                                placeholder="Phone Number"
                            />
                        </div>

                        <button type="submit" className="auth-btn">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Request;
