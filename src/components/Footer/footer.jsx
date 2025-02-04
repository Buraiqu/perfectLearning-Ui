import './footer.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const CustomFooter = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="py-4">
                    <Col md={3}>
                        <img src="path-to-logo.png" alt="Logo" height="30" className="mb-3" />
                        <p className="text-light small">Perfect Learning - Your path to success</p>
                    </Col>
                    <Col md={3}>
                        <h5 className="text-light">Quick Links</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-light py-1">About Us</Nav.Link>
                            <Nav.Link href="#" className="text-light py-1">Courses</Nav.Link>
                            <Nav.Link href="#" className="text-light py-1">Contact</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={3}>
                        <h5 className="text-light">Support</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#" className="text-light py-1">Help Center</Nav.Link>
                            <Nav.Link href="#" className="text-light py-1">Terms of Service</Nav.Link>
                            <Nav.Link href="#" className="text-light py-1">Privacy Policy</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={3}>
                        <h5 className="text-light">Follow Us</h5>
                        <div className="social-icons">
                            <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-light"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </Col>
                </Row>
                <Row className="border-top border-secondary py-3">
                    <Col className="text-center text-light small">
                        © {new Date().getFullYear()} Perfect Learning. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default CustomFooter;