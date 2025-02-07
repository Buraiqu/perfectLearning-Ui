
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import calenderIcon from '../../../icons/calender-icon.svg'
import clockIcon from '../../../icons/clock-icon.svg'
import circleTickIcon from '../../../icons/circle-tick-icon.svg'
import circleCrossIcon from '../../../icons/circle-cross-icon.svg'
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

                    <Form.Group className="form-group">
                        <Form.Label>Select the Course </Form.Label>
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
                                <div className="date-wrap">
                                    <div className="date-item">
                                        <div className="date-icon">
                                            <img src={calenderIcon} alt="calenderIcon"  />
                                        </div>
                                        <div className="date-text">
                                            <span className="date-label">Notification Date</span>
                                        </div>
                                    </div>

                                    <span className="date-value">{courseDetails.dates.notification}</span>
                                </div>
                                <div className="date-wrap">
                                    <div className="date-item">
                                        <div className="date-icon">
                                            <img src={clockIcon} alt="clockIcon"  />
                                        </div>
                                        <div className="date-text">
                                            <span className="date-label">Application Due Date</span>
                                        </div>
                                    </div>
                                    <span className="date-value">{courseDetails.dates.application}</span>
                                </div>
                                <div className="date-wrap">
                                    <div className="date-item">
                                        <div className="date-icon">
                                            <img src={calenderIcon} alt="calenderIcon"  />
                                        </div>
                                        <div className="date-text">
                                            <span className="date-label">Scheduled Exam Date</span>
                                        </div>
                                    </div>
                                    <span className="date-value">{courseDetails.dates.exam}</span>
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
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>15 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
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
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>20 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
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
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Complete syllabus</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Videos</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Access to teachers</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Class notes</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>Practice questions</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
                                <label>20 Mock Exams</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Discussion forum</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Ask the expert</label>
                            </li>
                            <li>
                                <span className="feature-icon not-available"><img src={circleCrossIcon} alt="" /></span>
                                <label>Mentorship</label>
                            </li>
                            <li>
                                <span className="feature-icon available"><img src={circleTickIcon} alt="" /></span>
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