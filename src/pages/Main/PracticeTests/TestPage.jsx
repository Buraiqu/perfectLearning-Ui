import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestPage.css';
import mcqReportIcon from '../../../icons/mcq_report.svg';
import mcqBookmarkIcon from '../../../icons/mcq_bookmark.svg';
import logo_short from '/assets/logo_short.svg';
import { BsQuestionCircle } from 'react-icons/bs';

const TestPage = ({ testData, onClose }) => {
    const navigate = useNavigate();
    
    // State for timer
    const [timeLeft, setTimeLeft] = useState('119:30');
    const [isAllQuestionsPanelOpen, setIsAllQuestionsPanelOpen] = useState(false);
    const [showFinishModal, setShowFinishModal] = useState(false);
    
    // State for attempted questions
    const [attempted, setAttempted] = useState(36);
    const [totalQuestions, setTotalQuestions] = useState(40);
    
    // Current question
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState('A');
    const [revisitLater, setRevisitLater] = useState(false);
    
    // Question data
    const questionData = {
        text: "A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively.\nInitial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be",
        type: "Single Correct",
        options: [
            { id: 'A', text: '350' },
            { id: 'B', text: '75' },
            { id: 'C', text: '50' },
            { id: 'D', text: '525' }
        ],
        scoring: {
            correct: '+3',
            wrong: '-1'
        }
    };
    
    // Questions list for sidebar (used by sidebar and for total count)
    const questionsList = Array(40).fill().map((_, i) => i + 1);

    // Mock data for the 'All Questions' panel - replace with actual data later
    const allQuestionsDataForPanel = [
        {
            id: 1,
            type: "Single Correct",
            text: "A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be",
            status: "not-answered" // 'not-answered', 'answered', 'revisit-later'
        },
        {
            id: 2,
            type: "Multiple Correct",
            text: "A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be",
            status: "answered"
        },
        {
            id: 3,
            type: "Fill blank",
            text: "This is a placeholder text for question 3 which is marked for revisit later.",
            status: "revisit-later"
        },
        // Add more questions as needed to fill up to 'totalQuestions'
        // For demonstration, let's add a few more generic ones if questionsList is longer
        ...Array(Math.max(0, totalQuestions - 3)).fill(null).map((_, i) => ({
            id: i + 4,
            type: "Single Correct",
            text: `This is the placeholder text for question ${i + 4}.`,
            status: "not-answered"
        }))
    ].slice(0, totalQuestions); // Ensure we don't exceed totalQuestions

    
    // Function to handle navigation
    const handleNavigation = (direction) => {
        if (direction === 'next' && currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (direction === 'prev' && currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Function to toggle the 'All Questions' panel
    const toggleAllQuestionsPanel = () => {
        setIsAllQuestionsPanelOpen(!isAllQuestionsPanelOpen);
    };

    const handleQuestionSelectFromPanel = (qNum) => {
        setCurrentQuestion(qNum);
        // Optionally close the panel after selection, or leave it open
        // setIsAllQuestionsPanelOpen(false);
    };

    const handleFinishTest = () => {
        setShowFinishModal(true);
    };

    const confirmFinishTest = () => {
        console.log("Test finished and confirmed!"); // Placeholder for actual submission
        
        // In a real implementation, you would submit the test data to your backend here
        // const response = await submitTestData(testData, answers);
        
        // Navigate to the test results page
        // You can pass test data as state or query parameters if needed
        navigate('/main/practice-tests/results', { 
            state: { 
                testId: testData?.id || '2023-IIT-JEE-Mains-Paper-1',
                score: '80/120',
                scorePercentage: '66.67%',
                attempted: attempted,
                correct: 28,
                incorrect: 8,
                unattempted: totalQuestions - attempted,
                timeSpent: '119:30'
            } 
        });
        
        setShowFinishModal(false);
    };
    
    return (
        <div className="test-page">
            {/* Header */}
            <div className="test-header">
                <div className="header-left-content">
                    <img src={logo_short} alt="Perfect Learning Logo" width="48" height="48" />
                    <span>2023 IIT JEE Mains Paper 1</span>
                </div>

                <div className="header-middle-group">
                    <div className="header-center-content">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z" stroke="#003986" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 4V8L10.6667 9.33333" stroke="#003986" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Time Left : {timeLeft}</span>
                    </div>
                    <div className="attempt-section">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66663 1.33337H2.99996C2.26358 1.33337 1.66663 1.93033 1.66663 2.66671V13.3334C1.66663 14.0698 2.26358 14.6667 2.99996 14.6667H13C13.7363 14.6667 14.3333 14.0698 14.3333 13.3334V9.66671" stroke="#003986" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.1666 2.16671C13.5187 1.81454 14.1444 1.81454 14.4966 2.16671C14.8487 2.51887 14.8487 3.14454 14.4966 3.49671L8.24996 9.75004L5.66663 10.3334L6.24996 7.75004L12.5 1.50004C12.8521 1.14787 13.4778 1.14787 13.83 1.50004C14.1821 1.8522 14.1821 2.47787 13.83 2.83004" stroke="#003986" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Attempted : {attempted}/{totalQuestions}</span>
                    </div>
                </div>

                <div className="exit-section" onClick={onClose}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#111111"/>
                    </svg>
                    <span>Exit test</span>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="main-and-footer-wrapper">
                <div className="test-content">
                <div className="question-section">
                    <div className="question-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', boxShadow: 'none', background: 'none', marginBottom: '16px', paddingBottom: '12px' }}>
                        <div className="question-number" style={{ fontSize: '14px', fontWeight: '600', color: '#101828', border: 'none', boxShadow: 'none', background: 'none' }}>Q{currentQuestion} (Single Correct)</div>
                        <div style={{ display: 'flex', gap: '5px', border: 'none', boxShadow: 'none', background: 'none' }}>
                            <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }} title="Bookmark this question">
                                <img src={mcqBookmarkIcon} alt="Bookmark" width="20" height="20" />
                            </button>
                            <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }} title="Report this question">
                                <img src={mcqReportIcon} alt="Report" width="20" height="20" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="question-content">
                        <p>{questionData.text}</p>
                        
                        <div className="scoring-info">
                            <span className="correct-score">Correct: {questionData.scoring.correct}</span>
                            <span className="wrong-score">Wrong: {questionData.scoring.wrong}</span>
                        </div>
                    </div>
                    
                    <div className="answer-options">
                        {questionData.options.map(option => (
                            <div 
                                key={option.id}
                                className={`answer-option ${selectedAnswer === option.id ? 'selected' : ''}`}
                                onClick={() => setSelectedAnswer(option.id)}
                            >
                                <div className="option-radio">
                                    {selectedAnswer === option.id && <div className="radio-inner"></div>}
                                </div>
                                <div className="option-id">({option.id})</div>
                                <div className="option-text">{option.text}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="question-actions-footer">
                        <label className="revisit-checkbox">
                            <input 
                                type="checkbox" 
                                checked={revisitLater}
                                onChange={() => setRevisitLater(!revisitLater)}
                            />
                            <span className="checkbox-text">Revisit later</span>
                        </label>
                        
                        <div className="navigation-buttons">
                            <button 
                                className="nav-btn prev"
                                onClick={() => handleNavigation('prev')}
                                disabled={currentQuestion === 1}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L6 8L10 4" stroke="#003986" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Previous
                            </button>
                            {currentQuestion === totalQuestions ? (
                                <button 
                                    className="nav-btn next" // Using 'next' class for same styling
                                    onClick={handleFinishTest}
                                >
                                    Finish
                                    {/* Using the same arrow icon as 'Next' for visual consistency */}
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L10 8L6 4" stroke="#ffffff" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            ) : (
                                <button 
                                    className="nav-btn next"
                                    onClick={() => handleNavigation('next')}
                                    disabled={currentQuestion === totalQuestions} /* This disabled logic is effectively handled by the conditional rendering now, but kept for clarity if 'Finish' button was part of the same structure */
                                >
                                    Next
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L10 8L6 4" stroke="#ffffff" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="question-sidebar">
                    <div className="questions-grid">
                        {questionsList.map((qNum) => {
                            // Determine the class for the question button
                            let btnClass = 'q-btn';
                            if (qNum === currentQuestion) btnClass += ' active';
                            if (qNum <= attempted && qNum !== currentQuestion) btnClass += ' attempted';
                            
                            return (
                                <button 
                                    key={qNum} 
                                    className={btnClass}
                                    onClick={() => setCurrentQuestion(qNum)}
                                >
                                    Q{qNum}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="test-instructions-container">
                <a href="#" className="test-instructions-standalone">Test instructions</a>
            </div>
            <div className="test-footer">
                {/* Test instructions link moved out */}
                <button className="all-questions-btn" onClick={toggleAllQuestionsPanel}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="#003986" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>All Questions</span>
                </button>
            </div>
            </div> {/* End of main-and-footer-wrapper */}

            {/* All Questions Sliding Panel */}
            {isAllQuestionsPanelOpen && (
                <div className={`all-questions-panel ${isAllQuestionsPanelOpen ? 'open' : ''}`}>
                    <div className="all-questions-panel-header">
                        <h3>All Questions</h3>
                        <button onClick={toggleAllQuestionsPanel} className="close-panel-btn" aria-label="Close all questions panel">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                    </div>
                    <div className="all-questions-panel-content">
                        {allQuestionsDataForPanel.map((qData) => {
                            let itemClass = 'panel-question-item';
                            if (qData.id === currentQuestion) itemClass += ' current';
                            return (
                                <div 
                                    key={`panel-q-${qData.id}`} 
                                    className={itemClass}
                                    onClick={() => handleQuestionSelectFromPanel(qData.id)}
                                >
                                    <div className="panel-question-header">
                                        <span className="panel-question-id">Q{qData.id}</span>
                                        <span className="panel-question-type">({qData.type})</span>
                                    </div>
                                    <p className="panel-question-text">{qData.text}</p>
                                    <div className="status-tags">
                                        {qData.status === 'answered' && <span className="status-tag answered">Answered</span>}
                                        {qData.status === 'revisit-later' && <span className="status-tag revisit">Revisit Later</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {showFinishModal && (
                <div className="finish-test-modal-overlay">
                    <div className="finish-test-modal">
                        <button onClick={() => setShowFinishModal(false)} className="close-modal-btn" aria-label="Close finish confirmation">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4L4 12M4 4L12 12" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <h2 className="finish-modal-title">Are you sure that you would like to finish the test?</h2>
                        
                        <div className="finish-modal-summary">
                            <div className="summary-item">
                                <div className="summary-item-header">
                                    <span className="summary-icon attempted-icon">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="2" y="2" width="12" height="12" rx="2" stroke="#475467" strokeWidth="1.33333" />
                                            <path d="M11.3333 5.33333L6.66667 10L4.66667 8" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                    <span className="summary-label">Attempted</span>
                                </div>
                                <span className="summary-value">{attempted}</span>
                            </div>
                            <div className="summary-item">
                                <div className="summary-item-header">
                                    <span className="summary-icon revisit-icon">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 10.6667V8M8 5.33333H8.00667M14.6667 8C14.6667 11.6819 11.682 14.6667 8 14.6667C4.31811 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.31811 4.31811 1.33333 8 1.33333C11.682 1.33333 14.6667 4.31811 14.6667 8Z" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                    <span className="summary-label">Revisit Later</span>
                                </div>
                                <span className="summary-value">3</span>
                            </div>
                            <div className="summary-item">
                                <div className="summary-item-header">
                                    <span className="summary-icon unattempted-icon">
                                        <BsQuestionCircle size={22} color="#475467" />
                                    </span>
                                    <span className="summary-label">Unattempted</span>
                                </div>
                                <span className="summary-value">4</span>
                            </div>
                            <div className="summary-item">
                                <div className="summary-item-header">
                                    <span className="summary-icon time-icon">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                    <span className="summary-label">Time Left</span>
                                </div>
                                <span className="summary-value">1:30 Min</span>
                            </div>
                        </div>
                        
                        <div className="finish-modal-actions">
                            <button onClick={confirmFinishTest} className="finish-modal-confirm-btn">
                                Finish test
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestPage;
