import React, { useState } from 'react';
import './practiceTests.css';

import customTestsIcon from '../../../icons/custom_tests.svg';
import mockTestsIcon from '../../../icons/mock_tests.svg';
import closeIcon from '../../../icons/close-icon.svg';
import editIcon from '../../../icons/edit-icon.svg';
import mathImage from '../../../icons/math-image.svg';
import physicsImage from '../../../icons/physics-image.svg';
import chemistryImage from '../../../icons/chemistry-image.svg';
// Import TestPage component
import TestPage from './TestPage';

const PracticeTests = () => {
    // You can replace this with the actual user name from your authentication context
    const userName = "Sravanthi";
    
    // State to track whether the mock tests section is visible
    const [showMockTests, setShowMockTests] = useState(false);
    
    // State to track whether the custom tests section is visible
    const [showCustomTests, setShowCustomTests] = useState(false);
    
    // State to track which test series is expanded
    const [expandedSeries, setExpandedSeries] = useState(null);
    
    // State for the test modal
    const [showModal, setShowModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    
    // State for custom test modal
    const [showCustomTestModal, setShowCustomTestModal] = useState(false);
    const [customTestStep, setCustomTestStep] = useState(1);
    const [customTestData, setCustomTestData] = useState({
        testName: 'Custom Test 1',
        subjects: [],
        duration: 30,
        questions: 10,
        difficulty: 'Medium'
    });
    
    // State for editing test name
    const [isEditingTestName, setIsEditingTestName] = useState(false);
    const [tempTestName, setTempTestName] = useState('Custom Test 1');
    
    // State for completed tests
    const [completedTests, setCompletedTests] = useState([]);
    
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
                    <div className={`test-card ${showCustomTests ? 'active' : ''}`} onClick={() => {
                        setShowCustomTests(!showCustomTests);
                        setShowMockTests(false);

                    }}>
                        <div className="test-card-icon">
                            <img src={customTestsIcon} alt="Custom Tests" />
                        </div>
                        <div className="test-card-title">Custom Tests</div>
                    </div>

                    {/* Mock Tests Card */}
                    <div 
                        className={`test-card ${showMockTests ? 'active' : ''}`}
                        onClick={() => {
                            setShowMockTests(!showMockTests);
                            setShowCustomTests(false);
                        }}
                    >
                        <div className="test-card-icon">
                            <img src={mockTestsIcon} alt="Mock Tests" className="mock-test-icon" />
                        </div>
                        <div className="test-card-title">Mock Tests</div>
                    </div>
                </div>

                {/* Custom Tests Container - only shown when showCustomTests is true */}
                {showCustomTests && (
                    <div className="custom-tests-container">
                        <div className="create-test-button-container">
                            <button className="create-test-button" onClick={() => setShowCustomTestModal(true)}>
                                Create Test
                            </button>
                        </div>
                        
                        <div className="completed-tests-section">
                            <h3>Completed Tests</h3>
                            <div className="tests-count">
                                <span className="test-icon">📈</span>
                                <span>{completedTests.length} {completedTests.length === 1 ? 'Test' : 'Tests'}</span>
                            </div>
                            
                            {completedTests.length === 0 ? (
                                <div className="no-tests-message">
                                    No tests taken yet
                                </div>
                            ) : (
                                <div className="completed-tests-list">
                                    {completedTests.map(test => (
                                        <div key={test.id} className="completed-test-item">
                                            <div className="test-name">{test.name}</div>
                                            <div className="test-info">
                                                <span className="duration-icon"></span> {test.duration} Mins | {test.questions} Questions | {test.difficulty} Difficulty
                                            </div>
                                            <div className="test-score">Score Percentage: <span className="score-value">{test.scorePercentage}%</span></div>
                                            <div className="test-summary-link-container">
                                                <a href="#" className="test-summary-link">Test Summary</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
            
            {/* Custom Test Modal */}
            {showCustomTestModal && (
                <div className="custom-test-modal-overlay">
                    <div className="custom-test-modal">
                        <div className="custom-test-modal-header">
                            <div className="title-container">
                                {customTestStep !== 1 && (
                                    <button 
                                        className="modal-back-button"
                                        onClick={() => setCustomTestStep(customTestStep - 1)}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 18L9 12L15 6" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                )}
                                {isEditingTestName ? (
                                    <div className="edit-title-container">
                                        <input 
                                            type="text" 
                                            value={tempTestName} 
                                            onChange={(e) => setTempTestName(e.target.value)}
                                            className="edit-title-input"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    if (tempTestName.trim() !== '') {
                                                        setCustomTestData({
                                                            ...customTestData,
                                                            testName: tempTestName.trim()
                                                        });
                                                        setIsEditingTestName(false);
                                                    }
                                                } else if (e.key === 'Escape') {
                                                    setTempTestName(customTestData.testName);
                                                    setIsEditingTestName(false);
                                                }
                                            }}
                                            onBlur={() => {
                                                if (tempTestName.trim() !== '') {
                                                    setCustomTestData({
                                                        ...customTestData,
                                                        testName: tempTestName.trim()
                                                    });
                                                } else {
                                                    setTempTestName(customTestData.testName);
                                                }
                                                setIsEditingTestName(false);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <h2>{customTestData.testName}</h2>
                                        <img 
                                            src={editIcon} 
                                            alt="Edit" 
                                            className="edit-icon" 
                                            onClick={() => {
                                                setTempTestName(customTestData.testName);
                                                setIsEditingTestName(true);
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                            <button className="close-button" onClick={() => {
                                setShowCustomTestModal(false);
                                setCustomTestStep(1);
                            }}>
                                <img src={closeIcon} alt="Close" />
                            </button>
                        </div>
                        
                        {customTestStep !== 3 && (
                            <div className="progress-indicator">
                                <div className="progress-bars">
                                    <div className={`progress-bar ${customTestStep >= 1 ? 'active' : ''}`}></div>
                                    <div className={`progress-bar ${customTestStep >= 2 ? 'active' : ''}`}></div>
                                </div>
                            </div>
                        )}
                        
                        {customTestStep === 1 && (
                            <div className="custom-test-modal-content">
                                <h3>Choose your subjects</h3>
                                
                                <div className="all-subjects-checkbox">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            onChange={() => {
                                                // Logic to select/deselect all subjects
                                                if (customTestData.subjects.includes('Mathematics') && 
                                                    customTestData.subjects.includes('Physics') && 
                                                    customTestData.subjects.includes('Chemistry')) {
                                                    setCustomTestData({
                                                        ...customTestData,
                                                        subjects: []
                                                    });
                                                } else {
                                                    setCustomTestData({
                                                        ...customTestData,
                                                        subjects: ['Mathematics', 'Physics', 'Chemistry']
                                                    });
                                                }
                                            }}
                                            checked={customTestData.subjects.includes('Mathematics') && 
                                                    customTestData.subjects.includes('Physics') && 
                                                    customTestData.subjects.includes('Chemistry')}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="subject-name">All Subjects</span>
                                    </label>
                                </div>
                                
                                <div className="subject-cards-container">
                                    <div 
                                        className={`subject-card ${customTestData.subjects.includes('Mathematics') ? 'selected' : ''}`}
                                        onClick={() => {
                                            const updatedSubjects = [...customTestData.subjects];
                                            if (updatedSubjects.includes('Mathematics')) {
                                                const index = updatedSubjects.indexOf('Mathematics');
                                                updatedSubjects.splice(index, 1);
                                            } else {
                                                updatedSubjects.push('Mathematics');
                                            }
                                            setCustomTestData({
                                                ...customTestData,
                                                subjects: updatedSubjects
                                            });
                                        }}
                                    >
                                        <img 
                                            src={mathImage} 
                                            alt="Mathematics" 
                                            className="subject-image" 
                                        />
                                        <div className="subject-card-name">Mathematics</div>
                                    </div>
                                    
                                    <div 
                                        className={`subject-card ${customTestData.subjects.includes('Physics') ? 'selected' : ''}`}
                                        onClick={() => {
                                            const updatedSubjects = [...customTestData.subjects];
                                            if (updatedSubjects.includes('Physics')) {
                                                const index = updatedSubjects.indexOf('Physics');
                                                updatedSubjects.splice(index, 1);
                                            } else {
                                                updatedSubjects.push('Physics');
                                            }
                                            setCustomTestData({
                                                ...customTestData,
                                                subjects: updatedSubjects
                                            });
                                        }}
                                    >
                                        <img 
                                            src={physicsImage} 
                                            alt="Physics" 
                                            className="subject-image" 
                                        />
                                        <div className="subject-card-name">Physics</div>
                                    </div>
                                    
                                    <div 
                                        className={`subject-card ${customTestData.subjects.includes('Chemistry') ? 'selected' : ''}`}
                                        onClick={() => {
                                            const updatedSubjects = [...customTestData.subjects];
                                            if (updatedSubjects.includes('Chemistry')) {
                                                const index = updatedSubjects.indexOf('Chemistry');
                                                updatedSubjects.splice(index, 1);
                                            } else {
                                                updatedSubjects.push('Chemistry');
                                            }
                                            setCustomTestData({
                                                ...customTestData,
                                                subjects: updatedSubjects
                                            });
                                        }}
                                    >
                                        <img 
                                            src={chemistryImage} 
                                            alt="Chemistry" 
                                            className="subject-image" 
                                        />
                                        <div className="subject-card-name">Chemistry</div>
                                    </div>
                                </div>
                                
                                <h3>Select topics</h3>
                                
                                <div className="topic-selection-radio">
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name="topicSelection"
                                            checked={true}
                                            readOnly
                                        />
                                        <span className="radio-mark"></span>
                                        <span className="topic-option">All Topics</span>
                                    </label>
                                    
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name="topicSelection"
                                            checked={false}
                                            readOnly
                                        />
                                        <span className="radio-mark"></span>
                                        <span className="topic-option">Completed Topics</span>
                                    </label>
                                </div>
                                
                                <div className="modal-footer">
                                    <button 
                                        className="next-button" 
                                        onClick={() => setCustomTestStep(2)}
                                        disabled={customTestData.subjects.length === 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {customTestStep === 2 && (
                            <div className="custom-test-modal-content">
                                <div className="test-configuration-section">
                                    <div className="slider-group">
                                        <label>Test Duration</label>
                                        <div className="slider-with-value">
                                            <div className="slider-container">
                                                <div 
                                                    className="slider-track-active" 
                                                    style={{ width: `${((customTestData.duration - 10) / (120 - 10)) * 100}%` }}
                                                ></div>
                                                <input 
                                                    type="range" 
                                                    min="10" 
                                                    max="120" 
                                                    value={customTestData.duration} 
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        setCustomTestData({
                                                            ...customTestData,
                                                            duration: value
                                                        });
                                                        // Update the slider thumb position via CSS variable
                                                        const percent = ((value - 10) / (120 - 10)) * 100;
                                                        e.target.parentElement.style.setProperty('--slider-percent', `${percent}%`);
                                                    }}
                                                    className="custom-slider"
                                                />
                                            </div>
                                            <span className="slider-value">{customTestData.duration} Mins</span>
                                        </div>
                                    </div>
                                    
                                    <div className="slider-group">
                                        <label>Number of questions</label>
                                        <div className="slider-with-value">
                                            <div className="slider-container">
                                                <div 
                                                    className="slider-track-active" 
                                                    style={{ width: `${((customTestData.questions - 5) / (50 - 5)) * 100}%` }}
                                                ></div>
                                                <input 
                                                    type="range" 
                                                    min="5" 
                                                    max="50" 
                                                    value={customTestData.questions} 
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        setCustomTestData({
                                                            ...customTestData,
                                                            questions: value
                                                        });
                                                        // Update the slider thumb position via CSS variable
                                                        const percent = ((value - 5) / (50 - 5)) * 100;
                                                        e.target.parentElement.style.setProperty('--slider-percent', `${percent}%`);
                                                    }}
                                                    className="custom-slider"
                                                />
                                            </div>
                                            <span className="slider-value">{customTestData.questions}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="difficulty-selection">
                                        <label>Choose difficulty</label>
                                        <div className="difficulty-buttons">
                                            <button 
                                                className={`difficulty-button ${customTestData.difficulty === 'Easy' ? 'selected' : ''}`}
                                                onClick={() => setCustomTestData({
                                                    ...customTestData,
                                                    difficulty: 'Easy'
                                                })}
                                            >
                                                Easy
                                            </button>
                                            <button 
                                                className={`difficulty-button ${customTestData.difficulty === 'Medium' ? 'selected' : ''}`}
                                                onClick={() => setCustomTestData({
                                                    ...customTestData,
                                                    difficulty: 'Medium'
                                                })}
                                            >
                                                Medium
                                            </button>
                                            <button 
                                                className={`difficulty-button ${customTestData.difficulty === 'Hard' ? 'selected' : ''}`}
                                                onClick={() => setCustomTestData({
                                                    ...customTestData,
                                                    difficulty: 'Hard'
                                                })}
                                            >
                                                Hard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="modal-footer">
                                    <button 
                                        className="start-test-button" 
                                        onClick={() => setCustomTestStep(3)}
                                    >
                                        Start Test
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {customTestStep === 3 && (
                            <div className="custom-test-modal-content final-step">
                                
                                <div className="test-info-row">
                                    <div className="info-item">
                                        <span className="info-label">Time</span>
                                        <span className="info-value">{customTestData.duration} Mins</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Questions</span>
                                        <span className="info-value">{customTestData.questions}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Difficulty</span>
                                        <span className="info-value">{customTestData.difficulty}</span>
                                    </div>
                                </div>
                                
                                <div className="instructions-section">
                                    <h3>Instructions</h3>
                                    <p><a href="#" className="instructions-link">Click here</a></p>
                                </div>
                                
                                <div className="start-test-container">
                                    <button 
                                        className="start-test-button" 
                                        onClick={() => {
                                            // Create a mock completed test
                                            const mockCompletedTest = {
                                                id: Date.now(),
                                                name: customTestData.testName,
                                                duration: customTestData.duration,
                                                questions: customTestData.questions,
                                                difficulty: customTestData.difficulty,
                                                scorePercentage: Math.floor(Math.random() * 41) + 60, // Random score between 60-100%
                                                completedDate: new Date()
                                            };
                                            
                                            // Add the completed test to the state
                                            setCompletedTests([...completedTests, mockCompletedTest]);
                                            
                                            // Close the modal and reset step
                                            setShowCustomTestModal(false);
                                            setCustomTestStep(1);
                                            
                                            // Show the custom tests section
                                            setShowCustomTests(true);
                                        }}
                                    >
                                        Start Test
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeTests;