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
  const handleRequest = (group, unitsRequested) => {
    setBloodStock(prevStock => prevStock.map(item =>
      item.group === group
        ? { ...item, units: item.units - unitsRequested }
        : item
    ));
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
        <Route path="/blood-bank" element={<BloodBank bloodStock={bloodStock} />} />
        {/* Request Page with Request Logic */}
        <Route path="/request" element={<Request bloodStock={bloodStock} onRequest={handleRequest} />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
