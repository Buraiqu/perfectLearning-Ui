import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import PerfectLearningLogo from '../../../assets/logo_full.svg';
import ResetPasswordModal from '../../../components/ResetPasswordModal/ResetPasswordModal';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/loginVerification');
    console.log('Form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };
/*ghjg*/
  return (
    <div className="login-form-container">
      <div className="logo-container">
        <img src={PerfectLearningLogo} alt="Perfect Learning Logo" className="logo" />
      </div>
      
      <h1 className="login-title">Log In</h1>
      <p className="login-subtitle">Enter your credentials to access you account</p>

      <button
        className="google-login-btn"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="google-icon" />
        Log in with Google
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
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
              name="password"
              value={formData.password}
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

        <div className="forgot-password-container">
          <button 
            className="forgot-password-link"
            onClick={() => setShowResetModal(true)}
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" className="login-btn">
          Log In
        </Button>

        <div className="signup-container">
          <p className="signup-text">
            New to Perfect Learning? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </Form>

      <ResetPasswordModal 
        show={showResetModal}
        onHide={() => setShowResetModal(false)}
      />
    </div>
  );
};

export default Login;
