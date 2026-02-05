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
    const [showModal, setShowModal] = useState(false);
    const [pendingRequest, setPendingRequest] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitToBackend = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/requests/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.patientName,
                    bloodGroup: data.bloodGroup,
                    units: Number(data.units),
                    phone: data.contactNumber,
                    address: data.hospitalName,
                    status: 'PENDING'
                }),
            });

            if (response.ok) {
                if (onRequest) {
                    onRequest(data.bloodGroup, Number(data.units));
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
            } else {
                setMessage('Failed to submit request');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            setMessage('Network error. Please try again.');
            setMessageType('error');
        }
    };

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const requestedGroup = requestData.bloodGroup;
        const requestedUnits = Number(requestData.units);

        // Find stock for the requested group
        const stockItem = bloodStock.find(item => item.group === requestedGroup);

        if (!stockItem) {
            setMessage('Blood group not available in stock registry');
            setMessageType('error');
            return;
        }

        if (stockItem.units === 0) {
            setMessage('Blood group Out of Stock (0 Available)');
            setMessageType('error');
            return;
        }

        if (requestedUnits > stockItem.units) {
            setPendingRequest({
                ...requestData,
                availableUnits: stockItem.units,
                requested: requestedUnits
            });
            setShowModal(true);
            return;
        }

        // Available, proceed
        await submitToBackend(requestData);
    };

    const confirmInsufficientRequest = async () => {
        if (!pendingRequest) return;

        // Use available units
        const updatedData = {
            ...pendingRequest,
            units: pendingRequest.availableUnits
        };

        setShowModal(false);
        setPendingRequest(null);
        await submitToBackend(updatedData);
    };

    const cancelRequest = () => {
        setShowModal(false);
        setPendingRequest(null);
        setMessage('Request cancelled due to insufficient stock');
        setMessageType('error');
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

            {/* Modal for Insufficient Stock */}
            {showModal && pendingRequest && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1100
                }}>
                    <div className="glass-card" style={{ maxWidth: '400px', background: '#2b0505', border: '2px solid #ff4d4d' }}>
                        <h3 style={{ color: '#ff4d4d', marginTop: 0 }}>Insufficient Stock</h3>
                        <p style={{ marginBottom: '20px' }}>
                            You requested <strong>{pendingRequest.requested}</strong> units. <br />
                            Only <strong>{pendingRequest.availableUnits}</strong> units of {pendingRequest.bloodGroup} are available.
                            <br /><br />
                            Do you want to proceed with <strong>{pendingRequest.availableUnits} units</strong>?
                        </p>
                        <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
                            <button
                                onClick={confirmInsufficientRequest}
                                className="auth-btn"
                                style={{ background: '#4ade80', color: 'black' }}>
                                OK ({pendingRequest.availableUnits} Units)
                            </button>
                            <button
                                onClick={cancelRequest}
                                className="auth-btn"
                                style={{ background: 'transparent', border: '1px solid white', color: 'white' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Request;
