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
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // navigate('/home', { state: { user: data } }); 
                navigate('/home');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
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
