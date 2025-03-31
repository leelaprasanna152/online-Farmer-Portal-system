import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner'; // Ensure this package is installed
import "./Register.css";

const Register = () => {
  const API_URL = 'http://localhost:4000';
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_URL}/buyer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${text}`);
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        throw new Error('Server response is not in JSON format.');
      }

      alert('✅ Buyer registered successfully');
      navigate('/login'); // Redirect after successful registration
    } catch (error) {
      alert(`❌ Registration failed: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="registerSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Registering... Please wait</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={registerHandler} autoComplete="off">
          <h3>Buyer Registration</h3>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
          <div className="btnSubmit">
            <button type="submit">Register</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;


