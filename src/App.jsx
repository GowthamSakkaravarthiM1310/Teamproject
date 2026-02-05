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
  // Initial Blood Stock State
  const [bloodStock, setBloodStock] = useState([
    { group: 'A+', units: 0 },
    { group: 'A-', units: 0 },
    { group: 'B+', units: 0 },
    { group: 'B-', units: 0 },
    { group: 'AB+', units: 0 },
    { group: 'AB-', units: 0 },
    { group: 'O+', units: 0 },
    { group: 'O-', units: 0 }
  ]);

  // Requests State
  const [requests, setRequests] = useState([]);

  // Handler for valid donation
  const handleDonate = (donorData) => {
    // We assume a valid donation request adds to the stock (conceptually)
    // or simply registers them. To show connection, let's increment stock.
    setBloodStock(prevStock => prevStock.map(item =>
      item.group === donorData.bloodGroup
        ? { ...item, units: item.units + 1 }
        : item
    ));
  };

  // Handler for blood request
  // Handler for blood request
  const handleRequest = (requestDetails) => {
    setRequests(prev => [...prev, { ...requestDetails, id: Date.now(), status: 'Pending' }]);
  };

  // Handler for granting request
  const handleGrantRequest = (requestId) => {
    setRequests(prevRequests => {
      const requestToGrant = prevRequests.find(req => req.id === requestId);
      if (!requestToGrant) return prevRequests;

      // Decrement stock
      setBloodStock(prevStock => prevStock.map(item =>
        item.group === requestToGrant.bloodGroup
          ? { ...item, units: item.units - requestToGrant.units }
          : item
      ));

      // Remove request or mark formatted (here we remove it for simplicity as implied by 'disappears')
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
