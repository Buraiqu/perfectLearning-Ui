import React, { useState } from 'react';
import './practiceTests.css';
// Import custom SVG icons
import customTestsIcon from '../../../icons/custom_tests.svg';
import mockTestsIcon from '../../../icons/mock_tests.svg';
// Import TestPage component
import TestPage from './TestPage';

const PracticeTests = () => {
    // You can replace this with the actual user name from your authentication context
    const userName = "Sravanthi";
    
    // State to track whether the mock tests section is visible
    const [showMockTests, setShowMockTests] = useState(false);
    
    // State to track which test series is expanded
    const [expandedSeries, setExpandedSeries] = useState(null);
    
    // State for the test modal
    const [showModal, setShowModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    
    // State to show the test page
    const [showTestPage, setShowTestPage] = useState(false);

    // Function to toggle the expanded state
    const toggleExpand = (seriesId) => {
        if (expandedSeries === seriesId) {
            setExpandedSeries(null);
        } else {
            setExpandedSeries(seriesId);
        }
    };

    return (
        <div className="practice-tests-section">
            <div className="practice-tests-container">
                {/* Header with greeting */}
                <div className="practice-tests-header">
                    <h2>Hello {userName}</h2>
                    {/* Notification bell icon would be part of the navbar component */}
                    <div className="notification-icon">
                        <i className="bell-icon"></i>
                    </div>
                </div>

                {/* Test cards container */}
                <div className="test-cards-container">
                    {/* Custom Tests Card */}
                    <div className="test-card">
                        <div className="test-card-icon">
                            <img src={customTestsIcon} alt="Custom Tests" />
                        </div>
                        <div className="test-card-title">Custom Tests</div>
                    </div>

                    {/* Mock Tests Card */}
                    <div 
                        className={`test-card ${showMockTests ? 'active' : ''}`}
                        onClick={() => setShowMockTests(!showMockTests)}
                    >
                        <div className="test-card-icon">
                            <img src={mockTestsIcon} alt="Mock Tests" className="mock-test-icon" />
                        </div>
                        <div className="test-card-title">Mock Tests</div>
                    </div>
                </div>

                {/* Mock Test Series Container - only shown when showMockTests is true */}
                {showMockTests && <div className="mock-test-series-container">
                    {/* Series 1 */}
                    <div className="test-series-item">
                        <div 
                            className={`test-series-header ${expandedSeries === 'series1' ? 'active' : ''}`}
                            onClick={() => toggleExpand('series1')}
                        >
                            <div className="series-info">
                                <h3>Mock Test Series 1</h3>
                                <div className="test-count">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3337 6.66667V11.9C13.3337 12.5 13.0337 13.0667 12.567 13.4333C12.1003 13.8 11.5003 14 10.867 14H5.13366C4.50033 14 3.90033 13.8 3.43366 13.4333C2.96699 13.0667 2.66699 12.5 2.66699 11.9V4.1C2.66699 3.5 2.96699 2.93333 3.43366 2.56667C3.90033 2.2 4.50033 2 5.13366 2H8.66699" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.332 2.00002L13.332 4.00002L11.332 6.00002" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 10.6667H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 8H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66699 5.33333H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>3 Tests</span>
                                </div>
                            </div>
                            <div className="expand-icon">
                                {expandedSeries === 'series1' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.5L10 7.5L15 12.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        
                        {expandedSeries === 'series1' && (
                            <div className="test-series-content">
                                <div className="test-item">
                                    <h4 className="test-title">2023 IIT JEE Mains Paper 1</h4>
                                    <div className="test-details">
                                        <div className="test-time">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 4V8L10.6667 9.33333" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>120 Mins</span>
                                        </div>
                                        <div className="divider">|</div>
                                        <div className="test-question-count">
                                            <span>50 Questions</span>
                                        </div>
                                    </div>
                                    <button className="take-test-btn" onClick={() => {
                                        setSelectedTest({
                                            name: "2023 IIT JEE Mains Paper 1",
                                            time: "120 Mins",
                                            questions: "50"
                                        });
                                        setShowModal(true);
                                    }}>Take Test</button>
                                </div>
                                <div className="test-item">
                                    <h4 className="test-title">2023 IIT JEE Advanced Paper 1</h4>
                                    <div className="test-details">
                                        <div className="test-time">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.682 14.6663 8.00001C14.6663 4.31801 11.6816 1.33334 7.99967 1.33334C4.31767 1.33334 1.33301 4.31801 1.33301 8.00001C1.33301 11.682 4.31767 14.6667 7.99967 14.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 4V8L10.6667 9.33333" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>90 Mins</span>
                                        </div>
                                        <div className="divider">|</div>
                                        <div className="test-question-count">
                                            <span>42 Questions</span>
                                        </div>
                                    </div>
                                    <button className="take-test-btn" onClick={() => {
                                        setSelectedTest({
                                            name: "2023 IIT JEE Advanced Paper 1",
                                            time: "90 Mins",
                                            questions: "42"
                                        });
                                        setShowModal(true);
                                    }}>Take Test</button>
                                </div>
                                <div className="test-item">
                                    <h4 className="test-title">2022 IIT JEE Mains Paper 2</h4>
                                    <div className="test-details">
                                        <div className="test-time">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.682 14.6663 8.00001C14.6663 4.31801 11.6816 1.33334 7.99967 1.33334C4.31767 1.33334 1.33301 4.31801 1.33301 8.00001C1.33301 11.682 4.31767 14.6667 7.99967 14.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M8 4V8L10.6667 9.33333" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>90 Mins</span>
                                        </div>
                                        <div className="divider">|</div>
                                        <div className="test-question-count">
                                            <span>45 Questions</span>
                                        </div>
                                    </div>
                                    <button className="take-test-btn" onClick={() => {
                                        setSelectedTest({
                                            name: "2023 IIT JEE Advanced Paper 1",
                                            time: "90 Mins",
                                            questions: "42"
                                        });
                                        setShowModal(true);
                                    }}>Take Test</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Series 2 */}
                    <div className="test-series-item">
                        <div 
                            className={`test-series-header ${expandedSeries === 'series2' ? 'active' : ''}`}
                            onClick={() => toggleExpand('series2')}
                        >
                            <div className="series-info">
                                <h3>Mock Test Series 2</h3>
                                <div className="test-count">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3337 6.66667V11.9C13.3337 12.5 13.0337 13.0667 12.567 13.4333C12.1003 13.8 11.5003 14 10.867 14H5.13366C4.50033 14 3.90033 13.8 3.43366 13.4333C2.96699 13.0667 2.66699 12.5 2.66699 11.9V4.1C2.66699 3.5 2.96699 2.93333 3.43366 2.56667C3.90033 2.2 4.50033 2 5.13366 2H8.66699" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.332 2.00002L13.332 4.00002L11.332 6.00002" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 10.6667H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 8H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66699 5.33333H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>20 Tests</span>
                                </div>
                            </div>
                            <div className="expand-icon">
                                {expandedSeries === 'series2' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.5L10 7.5L15 12.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        
                        {expandedSeries === 'series2' && (
                            <div className="test-series-content">
                                {/* Series 2 content would go here */}
                            </div>
                        )}
                    </div>

                    {/* Series 3 */}
                    <div className="test-series-item">
                        <div 
                            className={`test-series-header ${expandedSeries === 'series3' ? 'active' : ''}`}
                            onClick={() => toggleExpand('series3')}
                        >
                            <div className="series-info">
                                <h3>Mock Test Series 3</h3>
                                <div className="test-count">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3337 6.66667V11.9C13.3337 12.5 13.0337 13.0667 12.567 13.4333C12.1003 13.8 11.5003 14 10.867 14H5.13366C4.50033 14 3.90033 13.8 3.43366 13.4333C2.96699 13.0667 2.66699 12.5 2.66699 11.9V4.1C2.66699 3.5 2.96699 2.93333 3.43366 2.56667C3.90033 2.2 4.50033 2 5.13366 2H8.66699" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.332 2.00002L13.332 4.00002L11.332 6.00002" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 10.6667H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 8H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66699 5.33333H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>3 Tests</span>
                                </div>
                            </div>
                            <div className="expand-icon">
                                {expandedSeries === 'series3' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.5L10 7.5L15 12.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        
                        {expandedSeries === 'series3' && (
                            <div className="test-series-content">
                                {/* Series 3 content would go here */}
                            </div>
                        )}
                    </div>

                    {/* Series 4 */}
                    <div className="test-series-item">
                        <div 
                            className={`test-series-header ${expandedSeries === 'series4' ? 'active' : ''}`}
                            onClick={() => toggleExpand('series4')}
                        >
                            <div className="series-info">
                                <h3>Mock Test Series 4</h3>
                                <div className="test-count">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3337 6.66667V11.9C13.3337 12.5 13.0337 13.0667 12.567 13.4333C12.1003 13.8 11.5003 14 10.867 14H5.13366C4.50033 14 3.90033 13.8 3.43366 13.4333C2.96699 13.0667 2.66699 12.5 2.66699 11.9V4.1C2.66699 3.5 2.96699 2.93333 3.43366 2.56667C3.90033 2.2 4.50033 2 5.13366 2H8.66699" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.332 2.00002L13.332 4.00002L11.332 6.00002" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 10.6667H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66699 8H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66699 5.33333H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>20 Tests</span>
                                </div>
                            </div>
                            <div className="expand-icon">
                                {expandedSeries === 'series4' ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12.5L10 7.5L15 12.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        
                        {expandedSeries === 'series4' && (
                            <div className="test-series-content">
                                {/* Series 4 content would go here */}
                            </div>
                        )}
                    </div>
                </div>}
            </div>
            
            {/* Test Modal */}
            {showModal && selectedTest && (
                <div className="test-modal-overlay">
                    <div className="test-modal">
                        <button className="close-modal" onClick={() => setShowModal(false)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 6L18 18" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        
                        <h2 className="test-modal-title">{selectedTest.name}</h2>
                        
                        <div className="test-modal-details">
                            <div className="test-modal-time">
                                <span className="detail-label">Time</span> <span className="detail-value">{selectedTest.time}</span>
                            </div>
                            <div className="test-modal-questions">
                                <span className="detail-label">Questions</span> <span className="detail-value">{selectedTest.questions}</span>
                            </div>
                        </div>
                        
                        <div className="test-modal-section">
                            <h3>Instructions</h3>
                            <a href="#" className="modal-link">Click here</a>
                        </div>
                        
                        <div className="test-modal-section">
                            <h3>Topics Covered</h3>
                            <a href="#" className="modal-link">Click here</a>
                        </div>
                        
                        <button className="start-test-btn" onClick={() => {
                            setShowModal(false);
                            setShowTestPage(true);
                        }}>Start Test</button>
                    </div>
                </div>
            )}
            
            {/* Test Page */}
            {showTestPage && selectedTest && (
                <TestPage 
                    testData={selectedTest} 
                    onClose={() => setShowTestPage(false)} 
                />
            )}
        </div>
    );
};

export default PracticeTests;