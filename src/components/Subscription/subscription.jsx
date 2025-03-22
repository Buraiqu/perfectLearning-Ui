import React, { useContext, useState } from 'react';
import { Container, Form, Modal } from 'react-bootstrap';
import calenderIcon from '../../icons/calender-icon.svg'
import clockIcon from '../../icons/clock-icon.svg'
import circleTickIcon from '../../icons/circle-tick-icon.svg'
import circleCrossIcon from '../../icons/circle-cross-icon.svg'
import './subscription.css';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import CourseUpdatesAndNotificationModal from '../courseUpdatesAndNotificationsModal/courseUpdatesAndNotificationsModal';

const SubscriptionPlansComponent = ({data}) => {
    const {user} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    console.log(data)

    const plans = [
    {
        title: 'LDC 2022 Basic',
        standardPrice: 200,
        offerPrice: 140,
        features: [
            { name: 'Complete syllabus', available: true },
            { name: 'Videos', available: true },
            { name: 'Access to teachers', available: false },
            { name: 'Class notes', available: true },
            { name: 'Practice questions', available: true },
            { name: 'Mock Exams', available: true, count: 15 },
            { name: 'Discussion forum', available: false },
            { name: 'Ask the expert', available: false },
            { name: 'Mentorship', available: false },
            { name: 'Tool tips', available: true }
        ]
    },
    {
        title: 'LDC 2022 Intermediate',
        standardPrice: 200,
        offerPrice: 140,
        features: [
            { name: 'Complete syllabus', available: true },
            { name: 'Videos', available: true },
            { name: 'Access to teachers', available: false },
            { name: 'Class notes', available: true },
            { name: 'Practice questions', available: true },
            { name: 'Mock Exams', available: true, count: 20 },
            { name: 'Discussion forum', available: false },
            { name: 'Ask the expert', available: false },
            { name: 'Mentorship', available: false },
            { name: 'Tool tips', available: true }
        ]
    },
    {
        title: 'LDC 2022 Advanced',
        standardPrice: 200,
        offerPrice: 140,
        features: [
            { name: 'Complete syllabus', available: true },
            { name: 'Videos', available: true },
            { name: 'Access to teachers', available: false },
            { name: 'Class notes', available: true },
            { name: 'Practice questions', available: true },
            { name: 'Mock Exams', available: true, count: 20 },
            { name: 'Discussion forum', available: false },
            { name: 'Ask the expert', available: false },
            { name: 'Mentorship', available: false },
            { name: 'Tool tips', available: true }
        ]
    }
];

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

    const getCourseUpdates = () => {
        if(user){
            setShowModal(true)
            console.log(showModal)
        }else{
            navigate('/login')
        }
    };

    return (
        <div className="subscription-page">
            <Container>
                <div className="course-selector mb-4">

                    <Form.Group className="form-group">
                        <Form.Label>Select the Course </Form.Label>

                        <Form.Select defaultValue="IIT JEE Advanced" disabled>
                            <option disabled>IIT JEE Advanced</option>
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
                        <button className="notification-btn" type="button" onClick={() => {getCourseUpdates()}}>Get Course updates & notifications</button>
                    </div>
                </div>

                <h3 className="subscription-title">Subscription Plans</h3>

                <div className="plans-container">
                    {plans.map((plan, index) => (
                        <div key={index} className={`plan-card ${data && data.index && data.index == index ? 'current-plan' : ''}`}>
                            <div className="card-header">
                                <div className="plan-badge">LD</div>
                                <div>
                                    <h4 className="plan-title">{plan.title}</h4>
                                    <div className="standard-price">Standard Price: <span>${plan.standardPrice}</span></div>
                                    <div className="offer-price">
                                        <div className="offer-price-amount">Offer Price: <span className="price-value">${plan.offerPrice}</span></div>
                                        <span className="offer-ends">Offer ends in 5 days</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="features-list">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                        <span className={`feature-icon ${feature.available ? 'available' : 'not-available'}`}>
                                            <img src={feature.available ? circleTickIcon : circleCrossIcon} alt="" />
                                        </span>
                                        <label>{feature.name === 'Mock Exams' ? `${feature.count} ${feature.name}` : feature.name}</label>
                                    </li>
                                ))}
                            </ul>
                            {data && data.index && data.index == index ? (
                                <button className="current-plan-btn">Current Plan</button>
                            ):(
                                <>
                                    {data && data.action && data.action === 'upgrade-plan' ? (
                                        <div className="upgrade-section">
                                            <hr />
                                            <div className='pending-price'>
                                                <span style={{fontSize: '20px', color: '#03488B', fontWeight: '500'}}>$50</span> <span style={{fontSize: '15px', fontWeight: '400'}}>to upgrade from current plan</span>
                                            </div>
                                            <button className="enroll-btn-orange">Upgrade</button>
                                        </div>
                                    ) : (
                                        <button className="enroll-btn-orange" style={{marginTop: 'auto'}}>Enroll</button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
            <CourseUpdatesAndNotificationModal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
};

export default SubscriptionPlansComponent;