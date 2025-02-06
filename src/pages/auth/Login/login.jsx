import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import LoginImage from '../../assets/login_photo.svg';
import PerfectLearningLogo from '../../assets/logo_full.svg';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <Container fluid className="login-container">
      <Row className="h-100">
        <Col md={6} className="left-section">
          <div className="image-container">
            <LoginImage alt="Learning" className="login-background-image" />
          </div>
        </Col>
        <Col md={6} className="right-section d-flex align-items-center justify-content-center">
          <div className="login-form-container">
            <div className="text-center mb-4">
              <PerfectLearningLogo 
                alt="Perfect Learning" 
                className="logo mb-3"
              />
              <h1 className="login-title">Log In</h1>
              <p className="login-subtitle">Enter your credentials to access you account</p>
            </div>

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
              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
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

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="login-btn">
                Log In
              </Button>

              <p className="signup-text">
                New to Perfect Learning? <Link to="/signup" className="signup-link">Sign Up</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
