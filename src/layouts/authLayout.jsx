import { Outlet } from 'react-router-dom';
import LoginImage from '../assets/login_photo.svg';
import OnBoardingImage from '../assets/on_boarding_image.svg';
import { Container, Row, Col } from 'react-bootstrap';
import './css/authLayout.css';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OnBoarding from '../pages/auth/OnBoarding/onBoarding';

const AuthLayout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const stage = searchParams.get('stage');  
  const email = searchParams.get('email');
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (stage === 'onboarding') {
      console.log(stage, email, userId);
      const storedEmail = localStorage.getItem('email');
      const storedUserId = localStorage.getItem('userId');

      if (!email || !userId) {
        if (storedEmail && storedUserId) {
          // Add email and userId to URL from localStorage
          navigate(`?stage=onboarding&email=${storedEmail}&userId=${storedUserId}`, { replace: true });
        } else {
          // Redirect to signup if no valid email/userId
          navigate('/signup', { replace: true });
        }
      }
    }
  }, [stage, navigate]);

  useEffect(() => {}, [location.search]);

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
