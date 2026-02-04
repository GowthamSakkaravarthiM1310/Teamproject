import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const BloodBank = ({ bloodStock, requests, onGrant }) => {
    const userRole = localStorage.getItem('userRole');

    const getStatus = (units) => {
        if (units === 0) return 'Out of Stock';
        if (units < 5) return 'Low';
        return 'Available';
    };

    const getStatusColor = (status) => {
        if (status === 'Out of Stock') return '#ff4d4d'; // Red
        if (status === 'Low') return '#ffff00'; // Pure Yellow
        return '#4ade80'; // Green
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="content-area" style={{ flexDirection: 'column', alignItems: 'center', gap: '30px' }}>

                {/* Blood Stock Table */}
                <div className="glass-card" style={{ maxWidth: '800px' }}>
                    <h2>Blood Stock Levels</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: 'white' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Blood Group</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Units Available</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloodStock.map((stock, index) => {
                                const status = getStatus(stock.units);
                                return (
                                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <td style={{ padding: '10px' }}>{stock.group}</td>
                                        <td style={{ padding: '10px' }}>{stock.units}</td>
                                        <td style={{ padding: '10px', color: getStatusColor(status), fontWeight: 'bold' }}>
                                            {status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>


                {/* Admin Requests Approval Section */}
                {userRole === 'admin' && requests && requests.length > 0 && (
                    <div className="glass-card" style={{ maxWidth: '800px' }}>
                        <h2>Pending Blood Requests</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: 'white' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Hospital</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Patient</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Group</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Units</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <td style={{ padding: '10px' }}>{req.hospitalName}</td>
                                        <td style={{ padding: '10px' }}>{req.patientName}</td>
                                        <td style={{ padding: '10px' }}>{req.bloodGroup}</td>
                                        <td style={{ padding: '10px' }}>{req.units}</td>
                                        <td style={{ padding: '10px' }}>
                                            <button
                                                onClick={() => onGrant(req.id)}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: '#4ade80',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Granted
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodBank;
