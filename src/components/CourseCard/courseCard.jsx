import {Col, Card, Button } from 'react-bootstrap';
import './courseCard.css';
import courseCardLogo from '../../assets/course-card-logo.svg';

const CourseCard = ({ course }) => {
    
    const renderStars = (count) => {
        return Array(5).fill(null).map((_, index) => (
            <span key={index} className={index < count ? 'star-filled' : 'star-empty'}>
                ★
            </span>
        ));
    };

    return (
        <Col md={4} className="mb-4">
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
                    <Button className="enroll-btn">Enroll</Button>
                    <Button className="view-btn">View More</Button>
                </div>
            </div>
            </Card.Body>
        </Card>
        </Col>
    );
};

export default CourseCard;