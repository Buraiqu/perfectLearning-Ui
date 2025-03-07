import { Container, Navbar, Nav, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fullLogo from '../../assets/logo_full.svg';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import Notification from '../Notification/notification';
import NavAvatar from '../NavAvatar/navAvatar';
import useWindowSize from '../../hooks/useWindowSize';

const CustomNavbar = ({user}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= 1130;

    useEffect(() => {
        if (expanded && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [expanded, isMobile]);

    const handleNavClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar bg="white" expand="custom" expanded={expanded} className={`navbar-custom pt-4 ${user ? 'background-grey' : 'background-white'}`}>
            <Container fluid className="px-4">
                <Navbar.Brand as={Link} to="/" className="me-5" onClick={handleNavClick}>
                    <img src={fullLogo} alt="Perfect Learning" height="50" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="nav-links">
                        <Nav.Link as={Link} to="/about" className="px-4" onClick={handleNavClick}>About</Nav.Link>
                        <Nav.Link as={Link} to="/" className="px-4" onClick={handleNavClick}>Courses</Nav.Link>
                        <Nav.Link as={Link} to="#" className="px-4" onClick={handleNavClick}>Instructors</Nav.Link>
                        {user && (
                            <>
                                <Nav.Link className="px-4 nav-custome-link">
                                    <span className="align-items-center gap-2">
                                        {isMobile && <Notification showOnlyIcon={false} />}
                                    </span>
                                </Nav.Link>
                                <Nav.Link as={Link}className="px-4 nav-custome-link">
                                    <span className="align-items-center gap-2">
                                        {isMobile && <NavAvatar showOnlyIcon={false}/>}
                                    </span>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex align-items-center search-form me-4 me-auto">
                        <div className="search-container">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="search-input"
                                aria-label="Search"
                            />
                            <div className="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </div>
                        </div>
                    </Form>
                    {!user ? (
                        <div className="auth-buttons">
                            <Button className="me-1 sign-in-btn" onClick={() => { navigate("/login"); handleNavClick(); }}>Sign In</Button>
                            <Button className="sign-up-btn filled-button" onClick={() => { navigate("/signup"); handleNavClick(); }}>Sign Up</Button>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-4 custom-show">
                            {!isMobile && <>
                                <Notification showOnlyIcon={true}/>
                                <NavAvatar showOnlyIcon={true}/>
                            </>}
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;