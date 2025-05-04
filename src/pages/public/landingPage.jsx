import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import './landingPage.css';
import CourseCard from '../../components/CourseCard/courseCard';
import carousal1 from '/assets/carousal-1.svg';
import carousal2 from '/assets/carousal-2.svg';
import carousal3 from '/assets/carousal-3.svg';
import { AuthContext } from '../../context/authContext';
import { publicContentService } from '../../api/services/PublicContentService';
import { useSearch } from '../../context/searchContext';

const LandingPage = () => {
  const {user} = useContext(AuthContext)
  const { searchQuery } = useSearch();
  const [courseCategoryCount, setCourseCategoryCount] = useState([])
  const [courseList, setCourseList] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [courseLoading, setCourseLoading] = useState(false)

  useEffect(() => {
    getCourseCategoryCount();
  }, [])

  useEffect(() => {
    getCourseList();
  }, [searchQuery])

  function getCourseCategoryCount(){
    setCategoryLoading(true);
    const payload = { "LoggedInUser": "VEL_S_PIL_1", "ScreenName": "CourseDashboard" };
    publicContentService.getCourseCategoryCount(payload).then(response => {
      if(response.success){
        setCourseCategoryCount(response.data.result)
      }
    }).catch(error => {
      console.log('Error fetching course category count')
    }).finally(() => {
      setCategoryLoading(false);
    });
  }

  function getCourseList(){
    setCourseLoading(true);
    const payload = { "LoggedInUser": "VEL_S_PIL_1", "Keyword": searchQuery || "" };
    publicContentService.getCourseListForApplication(payload).then(response => {
      if(response.success){
        setCourseList(response.data)
      }
    }).catch(error => {
      console.log('Error fetching course list')
    }).finally(() => {
      setCourseLoading(false);
    });
  }

  return (
    <div className="landing-page">
      <section className={`hero-section ${user ? 'background-grey' : 'background-white'}`}>
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
        <Container className='custom-cont'>
          <h2 className="section-title">COURSES OFFERED</h2>
          
          {categoryLoading ? (
            // Skeleton loaders for categories
            <>
              {[1, 2].map((item) => (
                <div key={item}>
                  <div className="skeleton-category"></div>
                  <Row>
                    {[1, 2, 3, 4, 5, 6].map((course) => (
                      <CourseCard key={course} loading={true} />
                    ))}
                  </Row>
                </div>
              ))}
            </>
          ) : (
            courseCategoryCount
            .sort((a, b) => a.Display_Order - b.Display_Order)
            .map((category, index) => (
            <React.Fragment key={category.Course_Category_Type_Code || index}>
              {courseList.filter(course => course.Course_Category_Type_Name === category.Course_Category_Type_Name).length > 0 && (
                <>
                  <h3 className="course-category">{category.Course_Category_Type_Name} ({category.Course_Count})</h3>
                  <Row>
                    {courseLoading ? (
                      // Show skeleton course cards when loading
                      [1, 2, 3, 4, 5, 6].map((item) => (
                        <CourseCard key={`skeleton-${item}`} loading={true} />
                      ))
                    ) : (
                      courseList
                      .filter(course => course.Course_Category_Type_Name === category.Course_Category_Type_Name)
                      .map((course, index) => (
                        <CourseCard key={`entrance-${index}`} course={course} />
                      ))
                    )}
                  </Row>
                  {courseList.filter(course => course.Course_Category_Type_Name === category.Course_Category_Type_Name).length > 6 && (
                    <div className="mb-4">
                      <Button className='filled-button show-more-btn'>Show More</Button>
                    </div>
                  )}
                </>
              )}
            </React.Fragment>
          ))
          )}
        </Container>
      </section>

      {/* Other Courses Section */}
      <section className="courses-section">
        <Container className='custom-cont'>
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