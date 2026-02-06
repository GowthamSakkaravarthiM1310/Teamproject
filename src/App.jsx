import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Donor from './pages/Donor';
import BloodBank from './pages/BloodBank';
import Request from './pages/Request';
import './App.css';

function App() {
 
  const [bloodStock, setBloodStock] = useState([
    { group: 'A+', units: 10 },
    { group: 'A-', units: 5 },
    { group: 'B+', units: 12 },
    { group: 'B-', units: 3 }, 
    { group: 'AB+', units: 8 },
    { group: 'AB-', units: 0 }, 
    { group: 'O+', units: 15 },
    { group: 'O-', units: 4 }
  ]);

  const [requests, setRequests] = useState([]);

  const handleDonate = (donorData) => {
    
    setBloodStock(prevStock => prevStock.map(item =>
      item.group === donorData.bloodGroup
        ? { ...item, units: item.units + 1 }
        : item
    ));
  };

  const handleRequest = (requestDetails) => {
    setRequests(prev => [...prev, { ...requestDetails, id: Date.now(), status: 'Pending' }]);
  };

  const handleGrantRequest = (requestId) => {
    setRequests(prevRequests => {
      const requestToGrant = prevRequests.find(req => req.id === requestId);
      if (!requestToGrant) return prevRequests;

      setBloodStock(prevStock => prevStock.map(item =>
        item.group === requestToGrant.bloodGroup
          ? { ...item, units: item.units - requestToGrant.units }
          : item
      ));

      return prevRequests.filter(req => req.id !== requestId);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        {/* Donor Page with Donation Logic */}
        <Route path="/donor" element={<Donor onDonate={handleDonate} />} />
        {/* Blood Bank Page with Stock Logic */}
        <Route path="/blood-bank" element={<BloodBank bloodStock={bloodStock} requests={requests} onGrant={handleGrantRequest} />} />
        {/* Request Page with Request Logic */}
        <Route path="/request" element={<Request bloodStock={bloodStock} onRequest={handleRequest} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
