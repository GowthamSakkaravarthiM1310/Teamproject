import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const BloodBank = ({ bloodStock }) => {

    const getStatus = (units) => {
        if (units === 0) return 'Out of Stock';
        if (units < 5) return 'Low';
        return 'Available';
    };

    const getStatusColor = (status) => {
        if (status === 'Out of Stock') return '#ff4d4d'; // Red
        if (status === 'Low') return '#ffa500'; // Orange
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
            </div>
        </div>
    );
};

export default BloodBank;
