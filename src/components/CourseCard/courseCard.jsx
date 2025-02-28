import {Col, Card, Button } from 'react-bootstrap';
import './courseCard.css';
import courseCardLogo from '../../assets/course-card-logo.svg';
import { Link } from "react-router";

const CourseCard = ({ course }) => {
    
    const renderStars = (count) => {
        return Array(5).fill(null).map((_, index) => (
            <span key={index} className={index < count ? 'star-filled' : 'star-empty'}>
                ★
            </span>
        ));
    };

    return (
        <Col xl={4} lg={6} md={6} sm={12} className="mb-4">
        <Card className="course-card">
            <Card.Body className="p-0">
            <div className="course-image-container">
                <img src={courseCardLogo} alt="Student studying" />
            </div>
            <div className="course-content p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                <h3 className="course-title mb-0">{course.title}</h3>
                <span className="course-type">Online Course</span>
                </div>
                <p className="course-subtitle mb-4">{course.description}</p>
                <div className="d-flex gap-2">
                    <div className="d-flex align-items-center me-5">
                        <div className="rating me-2">{renderStars(course.rating)}</div>
                    </div>
                    <div className="button-container d-flex gap-2">
                        <Link to="/subscription">
                            <Button className="filled-button enroll-btn">Enroll</Button>
                        </Link>
                        <Link to="/subscription">
                            <Button className="outline-button view-btn">View More</Button>
                        </Link>
                    </div>
                </div>
            </div>
            </Card.Body>
        </Card>
        </Col>
    );
};

export default CourseCard;