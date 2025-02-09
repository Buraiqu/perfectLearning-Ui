import { Outlet } from 'react-router-dom';
import LoginImage from '../assets/login_photo.svg';
import { Container, Row, Col } from 'react-bootstrap';
import './css/authLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={6} className="left-section">
            <div className="image-container">
              <img src={LoginImage} alt="Learning" className="auth-image" />
            </div>
          </Col>
          <Col md={6} className="right-section">
            <div className="form-wrapper">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthLayout;
