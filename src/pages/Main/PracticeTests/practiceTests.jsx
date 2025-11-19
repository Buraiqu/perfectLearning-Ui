import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './practiceTests.css';

import customTestsIcon from '../../../icons/custom_tests.svg';
import mockTestsIcon from '../../../icons/mock_tests.svg';
import closeIcon from '../../../icons/close-icon.svg';
import editIcon from '../../../icons/edit-icon.svg';
import mathImage from '../../../icons/math-image.svg';
import physicsImage from '../../../icons/physics-image.svg';
import chemistryImage from '../../../icons/chemistry-image.svg';

// Mock data - In production, this would come from an API
const mockTestSeries = [
    {
        id: 'jee-main-2024',
        title: 'JEE Main 2024',
        tests: [
            {
                id: 'jee-main-2024-paper-1',
                title: '2024 JEE Main Paper 1',
                duration: 180,
                questions: 90,
                subjects: ['Mathematics', 'Physics', 'Chemistry'],
                difficulty: 'Hard',
                maxMarks: 300
            },
            {
                id: 'jee-main-2024-paper-2',
                title: '2024 JEE Main Paper 2',
                duration: 180,
                questions: 90,
                subjects: ['Mathematics', 'Physics', 'Chemistry'],
                difficulty: 'Hard',
                maxMarks: 300
            }
        ]
    },
    {
        id: 'jee-main-2023',
        title: 'JEE Main 2023',
        tests: [
            {
                id: 'jee-main-2023-paper-1',
                title: '2023 JEE Main Paper 1',
                duration: 180,
                questions: 90,
                subjects: ['Mathematics', 'Physics', 'Chemistry'],
                difficulty: 'Hard',
                maxMarks: 300
            }
        ]
    },
    {
        id: 'neet-2024',
        title: 'NEET 2024',
        tests: [
            {
                id: 'neet-2024-paper-1',
                title: '2024 NEET Paper 1',
                duration: 200,
                questions: 200,
                subjects: ['Physics', 'Chemistry', 'Biology'],
                difficulty: 'Hard',
                maxMarks: 720
            }
        ]
    }
];

const subjectData = [
    { id: 'mathematics', name: 'Mathematics', icon: mathImage, color: '#FF6B6B' },
    { id: 'physics', name: 'Physics', icon: physicsImage, color: '#4ECDC4' },
    { id: 'chemistry', name: 'Chemistry', icon: chemistryImage, color: '#45B7D1' },
    { id: 'biology', name: 'Biology', icon: chemistryImage, color: '#96CEB4' }
];

const PracticeTests = () => {
    const navigate = useNavigate();
    const userName = "Sravanthi";

    // State management
    const [showMockTests, setShowMockTests] = useState(false);
    const [showCustomTests, setShowCustomTests] = useState(false);
    const [expandedSeries, setExpandedSeries] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [instructionsClicked, setInstructionsClicked] = useState(false);
    const [showCustomTestModal, setShowCustomTestModal] = useState(false);
    const [customTestStep, setCustomTestStep] = useState(1);
    const [isEditingTestName, setIsEditingTestName] = useState(false);
    const [tempTestName, setTempTestName] = useState('My Custom Test');
    const [topicSelectionMode, setTopicSelectionMode] = useState('all'); // 'all' or 'completed'
    const [expandedTopicSubject, setExpandedTopicSubject] = useState(null); // To track expanded subject for topics

    const [customTestData, setCustomTestData] = useState({
        testName: 'My Custom Test',
        subjects: [],
        topics: {},
        duration: 45,
        questions: 20,
        difficulty: 'Medium'
    });

    const [completedTests, setCompletedTests] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mockTopics = {
        Mathematics: ["Sets", "Relations & Functions", "Quadratic Equations", "Complex Numbers", "Sequences and Series"],
        Physics: ["Units and Measurement", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", "Work, Energy and Power"],
        Chemistry: ["Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "States of Matter"]
    };
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

                {/* Custom Tests Container */}
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
                                        isMobile ? (
                                            <div key={test.id} className="completed-test-item-mobile">
                                                <div className="test-name-mobile">{test.name}</div>
                                                <div className="test-info-mobile">{test.duration} Mins | {test.questions} Questions | {test.difficulty} Difficulty</div>
                                                <div className="completed-test-footer-mobile">
                                                    <div className="test-score-mobile">Score: <strong>{test.scorePercentage}%</strong></div>
                                                    <a href="#" className="test-summary-link-mobile">Test Summary</a>
                                                </div>
                                            </div>
                                        ) : (
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
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mock Test Series Container - Dynamic rendering */}
                {showMockTests && (
                    <div className="mock-test-series-container">
                        {mockTestSeries.map((series) => (
                            <div key={series.id} className="test-series-item">
                                <div
                                    className={`test-series-header ${expandedSeries === series.id ? 'active' : ''}`}
                                    onClick={() => toggleExpand(series.id)}
                                >
                                    <div className="series-info">
                                        <h3>{series.title}</h3>
                                        <div className="test-count">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.3337 6.66667V11.9C13.3337 12.5 13.0337 13.0667 12.567 13.4333C12.1003 13.8 11.5003 14 10.867 14H5.13366C4.50033 14 3.90033 13.8 3.43366 13.4333C2.96699 13.0667 2.66699 12.5 2.66699 11.9V4.1C2.66699 3.5 2.96699 2.93333 3.43366 2.56667C3.90033 2.2 4.50033 2 5.13366 2H8.66699" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.332 2.00002L13.332 4.00002L11.332 6.00002" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.66699 10.6667H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.66699 8H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.66699 5.33333H5.33366" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>{series.tests.length} {series.tests.length === 1 ? 'Test' : 'Tests'}</span>
                                        </div>
                                    </div>
                                    <div className="expand-icon">
                                        {expandedSeries === series.id ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12.5L10 7.5L15 12.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {expandedSeries === series.id && (
                                    <div className="test-series-content">
                                        {series.tests.map((test) => (
                                            <div key={test.id} className="test-item">
                                                <h4 className="test-title">{test.title}</h4>
                                                <div className="test-details">
                                                    <div className="test-time">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M8 4V8L10.6667 9.33333" stroke="#667085" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>{test.duration} Mins</span>
                                                    </div>
                                                    <div className="divider">|</div>
                                                    <div className="test-question-count">
                                                        <span>{test.questions} Questions</span>
                                                    </div>
                                                    <div className="divider">|</div>
                                                    <div className="test-difficulty">
                                                        <span>{test.difficulty} Difficulty</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="take-test-btn"
                                                    onClick={() => {
                                                        setSelectedTest(test);
                                                        setShowModal(true);
                                                        setInstructionsClicked(false); // Reset on modal open
                                                    }}
                                                >
                                                    Take Test
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Test Modal */}
                {showModal && selectedTest && (
                    <div className="test-modal-overlay">
                        <div className="test-modal">
                            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                                <img src={closeIcon} alt="Close" />
                            </button>

                            <h2 className="modal-title">{selectedTest.title}</h2>

                            <div className="test-modal-details">
                                <div className="test-modal-time">
                                    <span className="detail-label">Time</span>
                                    <span className="detail-value">{selectedTest.duration} Mins</span>
                                </div>
                                <div className="test-modal-questions">
                                    <span className="detail-label">Questions</span>
                                    <span className="detail-value">{selectedTest.questions}</span>
                                </div>
                            </div>

                            <div className="test-modal-section">
                                <h3>Instructions</h3>
                                <a href="#" className="modal-link" onClick={(e) => {
                                    e.preventDefault();
                                    setInstructionsClicked(true);
                                }}>Click here</a>
                            </div>

                            <div className="test-modal-section">
                                <h3>Topics Covered</h3>
                                <a href="#" className="modal-link">Click here</a>
                            </div>

                            <div className="start-test-container">
                                <button
                                    className={`start-test-btn ${!instructionsClicked ? 'disabled' : ''}`}
                                    disabled={!instructionsClicked}
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate(`/main/practice-tests/test/${selectedTest.id}`, {
                                            state: { testData: selectedTest }
                                        });
                                    }}>Start Test</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Test Modal - Simplified for now */}
                {showCustomTestModal && (
                    <>
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
                                                    <path d="M15 18L9 12L15 6" stroke="#344054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                                    const subject = 'Mathematics';
                                                    const updatedSubjects = [...customTestData.subjects];
                                                    const updatedTopics = { ...customTestData.topics };

                                                    if (updatedSubjects.includes(subject)) {
                                                        const index = updatedSubjects.indexOf(subject);
                                                        updatedSubjects.splice(index, 1);
                                                        delete updatedTopics[subject];
                                                    } else {
                                                        updatedSubjects.push(subject);
                                                        updatedTopics[subject] = [];
                                                    }

                                                    setCustomTestData({
                                                        ...customTestData,
                                                        subjects: updatedSubjects,
                                                        topics: updatedTopics
                                                    });
                                                    setTopicSelectionMode('completed');
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
                                                    const subject = 'Physics';
                                                    const updatedSubjects = [...customTestData.subjects];
                                                    const updatedTopics = { ...customTestData.topics };

                                                    if (updatedSubjects.includes(subject)) {
                                                        const index = updatedSubjects.indexOf(subject);
                                                        updatedSubjects.splice(index, 1);
                                                        delete updatedTopics[subject];
                                                    } else {
                                                        updatedSubjects.push(subject);
                                                        updatedTopics[subject] = [];
                                                    }

                                                    setCustomTestData({
                                                        ...customTestData,
                                                        subjects: updatedSubjects,
                                                        topics: updatedTopics
                                                    });
                                                    setTopicSelectionMode('completed');
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
                                                    const subject = 'Chemistry';
                                                    const updatedSubjects = [...customTestData.subjects];
                                                    const updatedTopics = { ...customTestData.topics };

                                                    if (updatedSubjects.includes(subject)) {
                                                        const index = updatedSubjects.indexOf(subject);
                                                        updatedSubjects.splice(index, 1);
                                                        delete updatedTopics[subject];
                                                    } else {
                                                        updatedSubjects.push(subject);
                                                        updatedTopics[subject] = [];
                                                    }

                                                    setCustomTestData({
                                                        ...customTestData,
                                                        subjects: updatedSubjects,
                                                        topics: updatedTopics
                                                    });
                                                    setTopicSelectionMode('completed');
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
                                                    value="all"
                                                    checked={topicSelectionMode === 'all'}
                                                    onChange={() => setTopicSelectionMode('all')}
                                                />
                                                <span className="radio-mark"></span>
                                                <span className="topic-option">All Topics</span>
                                            </label>

                                            <label className="radio-container">
                                                <input
                                                    type="radio"
                                                    name="topicSelection"
                                                    value="completed"
                                                    checked={topicSelectionMode === 'completed'}
                                                    onChange={() => setTopicSelectionMode('completed')}
                                                    disabled={customTestData.subjects.length === 0}
                                                />
                                                <span className="radio-mark"></span>
                                                <span className="topic-option">Completed Topics</span>
                                            </label>
                                        </div>

                                        {topicSelectionMode === 'completed' && customTestData.subjects.length > 0 && (
                                            <div className="topics-accordion-container">
                                                {customTestData.subjects.map(subject => (
                                                    <div key={subject} className="topic-accordion-item">
                                                        <div 
                                                            className="topic-accordion-header"
                                                            onClick={() => setExpandedTopicSubject(expandedTopicSubject === subject ? null : subject)}
                                                        >
                                                            <span>{subject}</span>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={expandedTopicSubject === subject ? 'expanded' : ''}>
                                                                <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        {expandedTopicSubject === subject && (
                                                            <div className="topic-accordion-content">
                                                                {mockTopics[subject].map(topic => (
                                                                    <label key={topic} className="checkbox-container topic-checkbox">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            checked={customTestData.topics[subject]?.includes(topic) || false}
                                                                            onChange={() => {
                                                                                const updatedTopics = { ...customTestData.topics };
                                                                                if (!updatedTopics[subject]) {
                                                                                    updatedTopics[subject] = [];
                                                                                }
                                                                                
                                                                                if (updatedTopics[subject].includes(topic)) {
                                                                                    updatedTopics[subject] = updatedTopics[subject].filter(t => t !== topic);
                                                                                } else {
                                                                                    updatedTopics[subject].push(topic);
                                                                                }

                                                                                setCustomTestData({ ...customTestData, topics: updatedTopics });
                                                                            }}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        <span className="subject-name">{topic}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

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
                    </>
                )}
            </div>
        </div>
    );
};

export default PracticeTests;
