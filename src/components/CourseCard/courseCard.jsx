import {Col, Card, Button } from 'react-bootstrap';
import './courseCard.css';
import courseCardLogo from '/assets/course-card-logo.svg';
import { Link } from "react-router";

const CourseCard = ({ course, loading = false }) => {
    
    const renderStars = (count) => {
        return Array(5).fill(null).map((_, index) => (
            <span key={index} className={index < count ? 'star-filled' : 'star-empty'}>
                ★
            </span>
        ));
    };

    if (loading) {
        return (
            <Col xl={4} lg={6} md={6} sm={12} className="mb-4">
                <Card className="course-card skeleton-card">
                    <Card.Body className="p-0">
                        <div className="course-image-container skeleton-image"></div>
                        <div className="course-content p-4">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="skeleton-title" style={{width: '60%'}}></div>
                                <div className="skeleton-badge" style={{width: '30%', height: '20px'}}></div>
                            </div>
                            <div className="skeleton-text mb-4" style={{width: '80%'}}></div>
                            <div className="d-flex gap-2">
                                <div className="d-flex align-items-center me-lg-5" style={{width: '30%'}}>
                                    <div className="skeleton-rating"></div>
                                </div>
                                <div className="button-container d-flex gap-2" style={{width: '70%'}}>
                                    <div className="skeleton-button" style={{height: '38px', width: '80px'}}></div>
                                    <div className="skeleton-button" style={{height: '38px', width: '100px'}}></div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
    
    return (
        <Col xl={4} lg={6} md={6} sm={12} className="mb-4">
        <Card className="course-card">
            <Card.Body className="p-0">
            <div className="course-image-container">
                <img src={courseCardLogo} alt="Student studying" />
            </div>
            <div className="course-content p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                <h3 className="course-title mb-0">{course.Exam_Short_Name}</h3>
                <span className="course-type">{course.Course_Delivery_Type_Name}</span>
                </div>
                <p className="course-subtitle mb-4">{course.Course_Name}</p>
                <div className="d-flex gap-2">
                    <div className="d-flex align-items-center me-lg-5 star-me-5">
                        <div className="rating me-2">{renderStars(course.Course_Rating)}</div>
                    </div>
                    <div className="button-container d-flex gap-2">
                        <Link to="/subscription" state={{ courseId: course.Course_Id}}>
                            <Button className="filled-button enroll-btn">Enroll</Button>
                        </Link>
                        <Link to="/subscription" state={{ courseId: course.Course_Id}}>
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