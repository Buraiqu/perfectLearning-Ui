import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import PerfectLearningLogo from '/assets/logo_full.svg';
import './signup.css';
import authService from '../../../api/services/AuthService';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    EmailAddress: '',
    passwordText: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
    
      const { confirmPassword, ...submitData } = formData;
      const doubleEncodedPassword = btoa(btoa(submitData.passwordText));
      
      submitData.passwordText = doubleEncodedPassword;

      const jsonString = JSON.stringify(submitData);
      
      const base64Encoded = btoa(jsonString);
      
      const payload = {
        c: base64Encoded
      };
      
      const response = await authService.register(payload);
      
      if (response) {
        if (response.success) {
        } else {
          console.error('Registration failed:', response.message || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="signup-form-container">
      <div className="logo-container">
        <img src={PerfectLearningLogo} alt="Perfect Learning Logo" className="logo" />
      </div>
      
      <h1 className="signup-title">Sign Up</h1>
      <p className="signup-subtitle">Create your account</p>

      <button
        className="google-signup-btn"
        onClick={handleGoogleSignup}
      >
        <FcGoogle className="google-icon" />
        Signup with Google
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="EmailAddress"
            name="EmailAddress"
            value={formData.EmailAddress}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="custom-input"
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <div className="password-input-container">
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="passwordText"
              value={formData.passwordText}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="custom-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
            </button>
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Re-enter Password</Form.Label>
          <div className="password-input-container">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="custom-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
            </button>
          </div>
        </Form.Group>

        <Button type="submit" className="signup-btn">
          Sign Up
        </Button>

        <div className="login-contain">
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link">Log In</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
