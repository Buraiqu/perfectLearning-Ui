import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import logo from '/assets/logo_full_white.svg';
import './footer.css';

const CustomFooter = () => {
    return (
        <footer className="footer">
            <Container className='footer-container'>
                <div className="footer-top">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src={logo} alt="Perfect Learning" />
                        </Link>
                    </div>
                    <div className="footer-nav">
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/blog">Blog</Link>
                    </div>
                    <div className="social-links">
                        <Link to="#"><FaFacebook /></Link>
                        <Link to="#"><FaTwitter /></Link>
                        <Link to="#"><FaLinkedin /></Link>
                        <Link to="#"><FaInstagram /></Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">
                        © All rights reserved.
                    </div>
                    {/* <div className="footer-links"> */}
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                        <Link to="/cancellation">Cancellation & Refund</Link>
                        <Link to="/shipping">Shipment & Delivery</Link>
                    {/* </div> */}
                </div>
            </Container>
        </footer>
    );
}

export default CustomFooter;