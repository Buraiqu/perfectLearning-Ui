import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Modal, Spinner } from 'react-bootstrap';
import calenderIcon from '../../icons/calender-icon.svg'
import clockIcon from '../../icons/clock-icon.svg'
import circleTickIcon from '../../icons/circle-tick-icon.svg'
import circleCrossIcon from '../../icons/circle-cross-icon.svg'
import './subscription.css';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import CourseUpdatesAndNotificationModal from '../courseUpdatesAndNotificationsModal/courseUpdatesAndNotificationsModal';
import {publicContentService} from '../../api/services/PublicContentService';

const SubscriptionPlansComponent = ({courseId, data}) => {
    const {user} = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [courseDetails, setCourseDetails] = useState({})
    const [coursePlan, setCoursePlan] = useState([])
    const [coursePlanFeatures, setCoursePlanFeatures] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [planLoading, setPlanLoading] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        if (courseId) {
            getCourseDetails();
            getCoursePlanAndFeatures();
        }
    }, [courseId])

    function getCourseDetails(){
        setIsLoading(true)
        const payload = { "LoggedInUser": "VEL_S_PIL_1", "CourseID": courseId}
        publicContentService.getCourseDetailsForEnroll(payload).then(response => {
            if(response.success){
                setCourseDetails(response.data[0])
            }
        }).catch(error => {
            console.log('Error fetching course details for enroll')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    function getCoursePlanAndFeatures(){
        setPlanLoading(true)
        const payload = { "LoggedInUser": "VEL_S_PIL_1", "CourseID": courseId, "CoursePlanID": "", "StudentID": "", "ScreenName": "ENROLLCOURSE" }
        publicContentService.getCoursePlanDetailsAndFeatures(payload).then(response => {
            if(response.success){
                console.log(response.data.coursePlan)
                setCoursePlan(response.data.coursePlan)
                setCoursePlanFeatures(response.data.coursePlanFeature)
            }
        }).catch(error => {
            console.log('Error fetching course plan details and features')
        }).finally(() => {
            setPlanLoading(false)
        })
    }

    const getCourseUpdates = () => {
        if(user){
            setShowModal(true)
            console.log(showModal)
        }else{
            navigate('/login')
        }
    };

    // Calculate days remaining until a given date
    const calculateDaysRemaining = (endDateString) => {
        if (!endDateString) return 0;
        
        const today = new Date();
        const endDate = new Date(endDateString);
        
        // Clear time portion for accurate day calculation
        today.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        
        // Calculate the difference in milliseconds
        const differenceMs = endDate - today;
        
        // Convert to days and round down
        const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
        
        // Return 0 if the date has passed
        return daysDifference > 0 ? 'Offer ends in ' + daysDifference + ' days' : 'Offer Ends';
    };

    // Format date to "30th May 2024" format
    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        
        // Get day with ordinal suffix
        const day = date.getDate();
        const ordinal = getOrdinalSuffix(day);
        
        // Get month name
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const month = monthNames[date.getMonth()];
        
        // Get year
        const year = date.getFullYear();
        
        return `${day}${ordinal} ${month} ${year}`;
    };
    
    // Helper function to get ordinal suffix for day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const isFeatureAvailable = (availabilityDate) => {
        if (!availabilityDate) return false;
        
        const today = new Date();
        const featureDate = new Date(availabilityDate);
        
        return featureDate >= today;
    };

    const getCurrencySymbol = (currencyCode) => {
        if (!currencyCode) return '$'; // Default to USD if no currency code
        
        const currencySymbols = {
            'USD': '$',    // US Dollar
            'EUR': '€',    // Euro
            'GBP': '£',    // British Pound
            'INR': '₹',    // Indian Rupee
            'JPY': '¥',    // Japanese Yen
            'CNY': '¥',    // Chinese Yuan
            'AUD': 'A$',   // Australian Dollar
            'CAD': 'C$',   // Canadian Dollar
            'CHF': 'Fr',   // Swiss Franc
            'AED': 'د.إ',  // UAE Dirham
            'SAR': '﷼',    // Saudi Riyal
        };
        
        return currencySymbols[currencyCode] || currencyCode;
    };

    return (
        <div className="subscription-page">
            {isLoading && (
                <div className="loading-state">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}
            <Container>
                <div className="course-selector mb-4">

                    <Form.Group className="form-group">
                        <Form.Label>Selected Course : &nbsp; {courseDetails.Exam_Short_Name}</Form.Label>
                    </Form.Group>
                </div>

                <div className="course-details mb-4">
                    <div className="course-details-content">
                        <div className="course-details-left">
                            <h2>{courseDetails.Course_Name}</h2>
                            {courseDetails.Notification_Url && (
                                <div className="course-link mb-2">
                                    Link: <a href={courseDetails.Notification_Url} target="_blank" rel="noopener noreferrer">{courseDetails.link}</a>
                                </div>
                            )}
                            <div className="course-code mb-3">{courseDetails.Exam_Short_Name}</div>
                            <p className="course-description">{courseDetails.Course_Description}</p>
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

                                    <span className="date-value">{formatDate(courseDetails.Notification_Date)}</span>
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
                                    <span className="date-value">{formatDate(courseDetails.Application_Due_Date)}</span>
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
                                    <span className="date-value">{formatDate(courseDetails.Scheduled_Exam_Date)}</span>
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
                    {planLoading ? (
                        // Skeleton loaders for plan cards
                        <>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="plan-card skeleton-card">
                                    <div className="card-header">
                                        <div className="plan-badge skeleton-badge"></div>
                                        <div style={{width: '100%'}}>
                                            <div className="skeleton-title"></div>
                                            <div className="skeleton-price"></div>
                                            <div className="skeleton-price"></div>
                                        </div>
                                    </div>
                                    <ul className="features-list">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((feature) => (
                                            <li key={feature}>
                                                <span className="feature-icon skeleton-icon"></span>
                                                <div className="skeleton-feature"></div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="skeleton-button"><span>Enroll</span></div>
                                </div>
                            ))}
                        </>
                    ) : (
                        coursePlan
                        .sort((a, b) => a.Course_Plan_Display_Order - b.Course_Plan_Display_Order)
                        .map((plan, index) => (
                        <div key={index} className={`plan-card ${data && data.index && data.index == index ? 'current-plan' : ''}`}>
                            <div className="card-header">
                                <div className="plan-badge">LD</div>
                                <div>
                                    <h4 className="plan-title">{plan.Course_Plan_Name}</h4>
                                    <div className="standard-price">Standard Price: <span>{getCurrencySymbol(plan.Currency_Code)}{plan.Course_Plan_Standard_Price}</span></div>
                                    <div className="offer-price">
                                        <div className="offer-price-amount">Offer Price: <span className="price-value">{getCurrencySymbol(plan.Currency_Code)}{plan.Course_Plan_Current_Offer_Price}</span></div>
                                        <span className="offer-ends">{calculateDaysRemaining(plan.Course_Plan_Current_Offer_Price_End_Date)}</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="features-list">
                                {coursePlanFeatures
                                .filter(feature => feature.Course_Plan_Id === plan.Course_Plan_Id)
                                .map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                        <span className={`feature-icon ${isFeatureAvailable(feature.Available_Date) ? 'available' : 'not-available'}`}>
                                            <img src={isFeatureAvailable(feature.Available_Date) ? circleTickIcon : circleCrossIcon} alt="" />
                                        </span>
                                        <label>{feature.Course_Feature_Type_Name}</label>
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
                    )))
                    }
                </div>
                {!coursePlan || coursePlan.length === 0 && !planLoading && (
                    <div className="no-plans-container">
                        <div className="no-plans-message">
                            <h3>No Plans Available</h3>
                            <p>There are currently no subscription plans available for this course.</p>
                        </div>
                    </div>
                )}
            </Container>
            <CourseUpdatesAndNotificationModal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
};

export default SubscriptionPlansComponent;