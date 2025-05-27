import React from 'react';
import { Container } from 'react-bootstrap';
import './about.css';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="about-page">
            <Container>
                <p className="section-title text-center">ABOUT US</p>
                
                <p className="text-center content">
                    Welcome to Perfect Learning, where academic excellence meets personal development! At Perfect Learning, we believe in empowering students to reach their 
                    full potential through a diverse range of courses tailored to meeting academic and personal growth needs.
                </p>

                <div className="section">
                    <h2 className="text-center content-heading">Our Story:</h2>
                    <p className="text-center content">
                        Perfect Learning was founded with a vision to redefine education by providing comprehensive courses that go beyond traditional learning boundaries. Whether 
                        you're preparing for entrance examinations or looking to enhance your soft skills, we're here to guide you every step of the way.
                    </p>
                </div>

                <div className="section">
                    <h2 className="text-center content-heading">What Sets Us Apart:</h2>
                    <p className="text-center content">
                        At Perfect Learning, we understand that every student is unique, and so are their learning needs. That's why we offer a dynamic range of courses spanning 
                        entrance examinations, soft skills development, and more. Our expert faculty, cutting-edge curriculum, and innovative teaching methodologies ensure that you 
                        not only excel academically but also develop the essential skills for success in today's dynamic world.
                    </p>
                </div>

                <div className="section">
                    <h2 className="text-center content-heading">Our Courses:</h2>
                    <p className="text-center content">
                        Explore a diverse array of courses designed to cater to a variety of interests and aspirations. From rigorous exam preparation to cultivating essential soft skills, 
                        Perfect Learning is your one-stop destination for holistic education. Our course genres are not final because we continuously strive to adapt and expand our 
                        offerings to meet the evolving needs of our students.
                    </p>
                </div>

                <div className="section">
                    <h2 className="text-center content-heading">Why Choose Perfect Learning?</h2>
                    <ul className="features-list-about text-center">
                        <li>- Expert Faculty: Learn from seasoned educators and industry professionals dedicated to your success.</li>
                        <li>- Comprehensive Curriculum: Our courses are designed to provide a well-rounded education that extends beyond textbooks.</li>
                        <li>- Personalized Approach: Tailor your learning experience to suit your unique strengths, weaknesses, and goals.</li>
                        <li>- Innovation in Education: We embrace the latest technologies and teaching methodologies to keep you ahead of the curve.</li>
                        <li>- Lifelong Learning: Perfect Learning is not just about passing exams; it's about fostering a love for continuous learning and personal growth.</li>
                    </ul>
                </div>

                <p className="text-center content">
                    Join us at Perfect Learning, where the pursuit of knowledge meets the art of personal development. Your journey to excellence begins here.
                </p>
            </Container>
        </div>
    );
};

export default AboutPage;