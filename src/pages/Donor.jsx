import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Donor = ({ onDonate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        bloodGroup: '',
        weight: '',
        lastDonationDate: '',
        phone: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateDaysSinceLastDonation = (dateString) => {
        if (!dateString) return 100; // If no date, assume eligible (first time)
        const today = new Date();
        const lastDate = new Date(dateString);
        const differenceInTime = today.getTime() - lastDate.getTime();
        return differenceInTime / (1000 * 3600 * 24);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        // Validation Rules
        if (Number(formData.age) < 18) {
            setMessage('Age must be 18 or above');
            setMessageType('error');
            return;
        }

        if (Number(formData.weight) < 50) {
            setMessage('Minimum weight required is 50 kg');
            setMessageType('error');
            return;
        }

        if (formData.lastDonationDate) {
            const daysSince = calculateDaysSinceLastDonation(formData.lastDonationDate);
            if (daysSince < 90) {
                setMessage('You are not eligible to donate now');
                setMessageType('error');
                return;
            }
        }

        // If all validations pass
        if (onDonate) {
            onDonate(formData);
        }

        setMessage('Donor registered successfully');
        setMessageType('success');

        // Reset form (optional)
        setFormData({
            fullName: '',
            age: '',
            bloodGroup: '',
            weight: '',
            lastDonationDate: '',
            phone: ''
        });
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="content-area">
                <div className="glass-card" style={{ maxWidth: '500px' }}>
                    <h2>Donor Registration</h2>
                    <p className="subtitle">Register to save lives</p>

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

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="Enter full name"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="input-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    placeholder="Age"
                                />
                            </div>
                            <div className="input-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    placeholder="Weight"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white', // Ensure text is visible
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            >
                                <option value="" style={{ color: 'black' }}>Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                    <option key={bg} value={bg} style={{ color: 'black' }}>{bg}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Last Donation Date</label>
                            <input
                                type="date"
                                name="lastDonationDate"
                                value={formData.lastDonationDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Phone number"
                            />
                        </div>

                        <button type="submit" className="auth-btn">Register Donor</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Donor;
