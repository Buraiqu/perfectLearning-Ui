
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import './subscriptionPlans.css';

const SubscriptionPlans = () => {
    const courseDetails = {
        title: 'Joint Entrance Examination Advanced',
        link: 'https://jeeadv.ac.in/',
        code: 'JEE Advanced 2023',
        description: 'Through JEE (Advanced), IITs offer admission into undergraduate courses leading to a Bachelors, Integrated Masters, Bachelor-Master Dual Degree in Engineering, Sciences, or Architecture. Both Bachelors and Masters degrees are awarded to candidates enrolled in the dual degree programs upon successful completion of the course curriculum requirements.',
        dates: {
            notification: '30th May 2024',
            application: '14th Dec 2023',
            exam: '26th May 2024'
        }
    };

    const plans = [
        {
            id: 'basic',
            title: 'LDC 2022 Basic',
            standardPrice: '$200',
            offerPrice: '$140',
            offerEnds: '5 days',
            features: [
                'Complete syllabus',
                'Videos',
                'Access to teachers',
                'Class notes',
                'Practice questions',
                '15 Mock Exams',
                'Discussion forum',
                'Ask the expert',
                'Mentorship',
                'Tool tips'
            ]
        },
        {
            id: 'intermediate',
            title: 'LDC 2022 Intermediate',
            standardPrice: '$200',
            offerPrice: '$140',
            offerEnds: '5 days',
            features: [
                'Complete syllabus',
                'Videos',
                'Access to teachers',
                'Class notes',
                'Practice questions',
                '20 Mock Exams',
                'Discussion forum',
                'Ask the expert',
                'Mentorship',
                'Tool tips'
            ]
        },
        {
            id: 'advanced',
            title: 'LDC 2022 Advanced',
            standardPrice: '$200',
            offerPrice: '$140',
            offerEnds: '5 days',
            features: [
                'Complete syllabus',
                'Videos',
                'Access to teachers',
                'Class notes',
                'Practice questions',
                '20 Mock Exams',
                'Discussion forum',
                'Ask the expert',
                'Mentorship',
                'Tool tips'
            ]
        }
    ];

    return (
        <div className="subscription-page">
            <Container>
                <div className="course-selector mb-4">
                    <Form.Group>
                        <Form.Label>Select the Course</Form.Label>
                        <Form.Select defaultValue="IIT JEE Advanced">
                            <option>IIT JEE Advanced</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className="course-details mb-4">
                    <div className="course-details-content">
                        <div className="course-details-left">
                            <h2>{courseDetails.title}</h2>
                            <div className="course-link mb-2">
                                Link: <a href={courseDetails.link} target="_blank" rel="noopener noreferrer">{courseDetails.link}</a>
                            </div>
                            <div className="course-code mb-3">{courseDetails.code}</div>
                            <p className="course-description">{courseDetails.description}</p>
                        </div>
                        
                        <div className="course-details-right">
                            <div className="important-dates">
                                <div className="date-item">
                                    <div className="date-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 2V6" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 2V6" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 10H21" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="date-text">
                                        <span className="date-label">Notification Date</span>
                                        <span className="date-value">{courseDetails.dates.notification}</span>
                                    </div>
                                </div>
                                <div className="date-item">
                                    <div className="date-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 6V12L16 14" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="date-text">
                                        <span className="date-label">Application Due Date</span>
                                        <span className="date-value">{courseDetails.dates.application}</span>
                                    </div>
                                </div>
                                <div className="date-item">
                                    <div className="date-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 2V6" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 2V6" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 10H21" stroke="#03488B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="date-text">
                                        <span className="date-label">Scheduled Exam Date</span>
                                        <span className="date-value">{courseDetails.dates.exam}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="notification-section">
                        <button className="notification-btn">Get Course updates & notifications</button>
                    </div>
                </div>

                <h3 className="subscription-title">Subscription Plans</h3>
                
                <div className="plans-container">
                    {/* Basic Plan */}
                    <div className="plan-card">
                        <div className="card-header">
                            <div className="plan-badge">LD</div>
                            <div>
                                <h4 className="plan-title">LDC 2022 Basic</h4>
                                <div className="standard-price">Standard Price: <span>$200</span></div>
                                <div className="offer-price">
                                    <div className="offer-price-amount">Offer Price: <span className="price-value">$140</span></div>
                                    <span className="offer-ends">Offer ends in 5 days</span>
                                </div>
                            </div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>15 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Tool tips</label>
                            </li>
                        </ul>

                        <button className="enroll-btn-orange">Enroll</button>
                    </div>

                    {/* Intermediate Plan */}
                    <div className="plan-card">
                        <div className="card-header">
                            <div className="plan-badge">LD</div>
                            <div>
                                <h4 className="plan-title">LDC 2022 Intermediate</h4>
                                <div className="standard-price">Standard Price: <span>$200</span></div>
                                <div className="offer-price">
                                    <div className="offer-price-amount">Offer Price: <span className="price-value">$140</span></div>
                                    <span className="offer-ends">Offer ends in 5 days</span>
                                </div>
                            </div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>20 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Tool tips</label>
                            </li>
                        </ul>

                        <button className="enroll-btn-orange">Enroll</button>
                    </div>

                    {/* Advanced Plan */}
                    <div className="plan-card">
                        <div className="card-header">
                            <div className="plan-badge">LD</div>
                            <div>
                                <h4 className="plan-title">LDC 2022 Advanced</h4>
                                <div className="standard-price">Standard Price: <span>$200</span></div>
                                <div className="offer-price">
                                    <div className="offer-price-amount">Offer Price: <span className="price-value">$140</span></div>
                                    <span className="offer-ends">Offer ends in 5 days</span>
                                </div>
                            </div>
                        </div>

                        <ul className="features-list">
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>20 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available">✕</span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available">✓</span>
                                <label>Tool tips</label>
                            </li>
                        </ul>

                        <button className="enroll-btn-orange">Enroll</button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SubscriptionPlans;