import { Outlet } from 'react-router-dom';
import LoginImage from '../assets/login_photo.svg';
import { Container, Row, Col } from 'react-bootstrap';
import './css/authLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <main>
        <Container fluid className="login-container">
          <Row className="h-100">
            <Col md={6} className="left-section">
              <div className="image-container">
                <img src={LoginImage} alt="Learning" />
              </div>
            </Col>
            <Col md={6} className="right-section d-flex align-items-center justify-content-center">
              <Outlet />
            </Col>
          </Row>
        </Container>

      </main>
    </div>
  );
};

export default AuthLayout;
