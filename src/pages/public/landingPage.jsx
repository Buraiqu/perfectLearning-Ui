import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import './landingPage.css';
import CourseCard from '../../components/CourseCard/courseCard';
import carousal1 from '../../assets/carousal-1.svg';
import carousal2 from '../../assets/carousal-2.svg';
import carousal3 from '../../assets/carousal-3.svg';

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
        <Container className='container-fluid'>
          <Row className="align-items-center">
            <Col md={12} style={{paddingLeft: "0px", paddingRight: "0px"}}>
              <Carousel
                controls={false}
                indicators={false}
                interval={3000}
                pause={false}
              >
                <Carousel.Item>
                  <img src={carousal1} alt="Target" className="hero-image" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={carousal2} alt="Target" className="hero-image" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={carousal3} alt="Target" className="hero-image" />
                </Carousel.Item>
              </Carousel>
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
            <Button className='filled-button show-more-btn'>Show More</Button>
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
          <Button className='filled-button show-more-btn'>Show More</Button>
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
            <Button className='filled-button show-more-btn'>Show More</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;