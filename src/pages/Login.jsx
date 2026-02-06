import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();

                if (isAdmin) {
                    if (user.role === 'admin') {
                        localStorage.setItem('userRole', 'admin');
                        navigate('/home');
                    } else {
                        setError('Access Denied: Not an admin account');
                    }
                } else {
                    localStorage.setItem('userRole', 'user');
                    navigate('/home');
                }
            } else {
                setError('Invalid Credentials');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card">
                <h2>{isAdmin ? 'Admin Login' : 'Welcome Back'}</h2>
                <p className="subtitle">{isAdmin ? 'Enter admin credentials' : 'Sign in to continue'}</p>

                {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Sign In</button>
                </form>
                <p className="footer-text">
                    {isAdmin ? (
                        <span onClick={() => setIsAdmin(false)} style={{ cursor: 'pointer', color: '#fff', textDecoration: 'underline' }}>
                            Back to User Login
                        </span>
                    ) : (
                        <>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                            <br />
                            <span onClick={() => setIsAdmin(true)} style={{ cursor: 'pointer', display: 'block', marginTop: '10px', opacity: 0.8 }}>
                                Login as Admin
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;
