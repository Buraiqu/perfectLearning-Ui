import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './landingPage.css';
import CourseCard from '../../components/CourseCard/courseCard';
import carousal1 from '../../assets/carousal-1.svg';

const LandingPage = () => {
  
  const entranceCourses = Array(6).fill({
    title: 'JEE Advanced 2023',
    description: 'Joint Entrance Examination Advanced',
    rating: 3
  });

  const jobExamCourses = Array(6).fill({
    title: 'JEE Advanced 2023',
    description: 'Joint Entrance Examination Advanced',
    rating: 3
  });

  return (
    <div className="landing-page">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            {/* <Col md={6}>
              <h1>
                <span className="text-navy">SET</span><br />
                <span className="text-blue">YOUR</span><br />
                <span className="text-navy">TARGET</span>
              </h1>
            </Col> */}
            <Col md={12}>
              <img src={carousal1} alt="Target" className="hero-image" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Entrance Courses Section */}
      <section className="courses-section">
        <Container>
          <h2 className="section-title">COURSES OFFERED</h2>
          <h3 className="course-category">Entrance Courses (11)</h3>
          <Row>
            {entranceCourses.slice(0, 6).map((course, index) => (
              <CourseCard key={`entrance-${index}`} course={course} />
            ))}
          </Row>
          <div className="mb-4">
            <Button className='show-more-btn'>Show More</Button>
          </div>
        </Container>
      </section>

      {/* Job Exam Courses Section */}
      <section className="courses-section">
        <Container>
          <h3 className="course-category">Job Exam Courses (11)</h3>
          <Row>
            {jobExamCourses.slice(0, 6).map((course, index) => (
              <CourseCard key={`job-${index}`} course={course} />
            ))}
          </Row>
          <div className="mb-4">
          <Button className='show-more-btn'>Show More</Button>
          </div>
        </Container>
      </section>

      {/* Other Courses Section */}
      <section className="courses-section">
        <Container>
          <h3 className="course-category">Other Courses (5)</h3>
          <Row>
            {Array(4).fill().map((_, index) => (
              <Col md={6} key={`other-${index}`} className="mb-5 mt-4">
                <Card className="other-course-card">
                  <Card.Body className='other-card-body'>
                    <Card.Title className='other-card-title'>Improve your Communication Skills</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mb-4">
            <Button className='show-more-btn'>Show More</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;