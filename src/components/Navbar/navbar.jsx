import { Container, Button, Navbar, Nav, Form } from 'react-bootstrap';
import fullLogo from '../../assets/logo_full.svg';
import './navbar.css';

const CustomNavbar = () => {
    return (
        <Navbar bg="white" expand="lg" className="navbar-custom fixed-top">
            <Container fluid className="px-4">
                <Navbar.Brand href="#" className="me-5">
                    <img src={fullLogo} alt="Perfect Learning" height="50" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="nav-links">
                        <Nav.Link href="#" className="px-4">About</Nav.Link>
                        <Nav.Link href="#" className="px-4">Courses</Nav.Link>
                        <Nav.Link href="#" className="px-4">Instructors</Nav.Link>
                    </Nav>
                    <Form className="d-flex align-items-center search-form me-4 me-auto">
                        <div className="search-container">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="search-input"
                                aria-label="Search"
                            />
                            <button type="submit" className="search-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </div>
                    </Form>
                    <div className="auth-buttons">
                        <Button className="me-1 sign-in-btn">Sign In</Button>
                        <Button className="sign-up-btn">Sign Up</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;