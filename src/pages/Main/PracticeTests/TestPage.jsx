import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './TestPage.css';
import mcqReportIcon from '../../../icons/BsExclamationTriangle.svg';
import mcqBookmarkIcon from '../../../icons/mcq_bookmark.svg';
import logo_short from '/assets/logo_short.svg';
import { BsQuestionCircle } from 'react-icons/bs';
import ReportQuestionModal from '../../../components/Modals/ReportQuestion-Modal/reportQuestionModal';
import FinishTestModal from '../../../components/Modals/FinishTestModal/FinishTestModal';

const mockTestData = {
    'jee-main-2024-paper-1': {
        id: 'jee-main-2024-paper-1',
        title: '2024 JEE Main Paper 1',
        duration: 180,
        questions: 90,
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        difficulty: 'Hard',
        maxMarks: 300
    },
    'jee-main-2024-paper-2': {
        id: 'jee-main-2024-paper-2',
        title: '2024 JEE Main Paper 2',
        duration: 180,
        questions: 90,
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        difficulty: 'Hard',
        maxMarks: 300
    },
    'jee-main-2023-paper-1': {
        id: 'jee-main-2023-paper-1',
        title: '2023 JEE Main Paper 1',
        duration: 180,
        questions: 90,
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        difficulty: 'Hard',
        maxMarks: 300
    },
    'neet-2024-paper-1': {
        id: 'neet-2024-paper-1',
        title: '2024 NEET Paper 1',
        duration: 200,
        questions: 200,
        subjects: ['Physics', 'Chemistry', 'Biology'],
        difficulty: 'Hard',
        maxMarks: 720
    }
};

const MobileTestView = ({ testData, timeLeft, attemptedCount, totalQuestions, currentQuestion, questionData, questions, selectedAnswer, handleSelectAnswer, handleNavigation, handleToggleRevisit, setShowReportModal, setShowExitModal, setShowFinishModal, toggleAllQuestionsPanel }) => {
    return (
        <div className="test-page-mobile">
            <div className="mobile-header">
                <div className="mobile-header-left">
                    <img src={logo_short} alt="Logo" className="mobile-logo" />
                    <div className="mobile-test-title">{testData.title}</div>
                </div>
                <div className="mobile-header-right">
                    <div className="mobile-timer">{timeLeft}</div>
                    <div className="mobile-attempted">{attemptedCount}/{totalQuestions} Attempted</div>
                </div>
            </div>

            <div className="mobile-question-area">
                {/* Question content remains the same */}
                <div className="mobile-question-header">
                    <span>Question {currentQuestion}/{totalQuestions}</span>
                    <div className="mobile-action-icons">
                        <button className="mobile-icon-btn">
                            <img src={mcqBookmarkIcon} alt="Bookmark" />
                        </button>
                        <button className="mobile-icon-btn" onClick={() => setShowReportModal(true)}>
                            <img src={mcqReportIcon} alt="Report" />
                        </button>
                    </div>
                </div>
                <div className="mobile-question-content">
                    <p>{questionData.text}</p>
                </div>
                <div className="mobile-options">
                    {questionData.options.map(option => (
                        <div 
                            key={option.id} 
                            className={`mobile-option ${selectedAnswer === option.id ? 'selected' : ''}`}
                            onClick={() => handleSelectAnswer(option.id)}
                        >
                            <span>{option.id}</span>
                            <p>{option.text}</p>
                        </div>
                    ))}
                </div>
                <div className="mobile-question-footer">
                    <label className="revisit-checkbox-mobile">
                        <input
                            type="checkbox"
                            checked={questions.find(q => q.id === currentQuestion)?.status === 'revisit-later'}
                            onChange={handleToggleRevisit}
                        />
                        <span>Revisit Later</span>
                    </label>
                </div>
            </div>

            <div className="mobile-footer">
                <div className="mobile-top-actions">
                    <button onClick={() => toggleAllQuestionsPanel()} className="mobile-nav-btn all-questions">All Questions</button>
                    <a href="#" className="mobile-nav-btn instructions">Instructions</a>
                </div>
                <div className="mobile-main-nav">
                    <button onClick={() => handleNavigation('prev')} className="mobile-nav-btn prev">Previous</button>
                    <button onClick={() => handleNavigation('next')} className="mobile-nav-btn next">Save & Next</button>
                    <button onClick={() => setShowFinishModal(true)} className="mobile-nav-btn finish">Finish Test</button>
                </div>
                 <button onClick={() => setShowExitModal(true)} className="mobile-nav-btn exit">Exit</button>
            </div>
        </div>
    );
};

const TestPage = () => {
    const navigate = useNavigate();
    const { testId } = useParams();
    const location = useLocation();
    
    const [testData, setTestData] = useState(null);
    const [timeLeft, setTimeLeft] = useState('119:30');
    const [isAllQuestionsPanelOpen, setIsAllQuestionsPanelOpen] = useState(false);
    const [isQuestionsPanelOpen, setIsQuestionsPanelOpen] = useState(false);
    const [showFinishModal, setShowFinishModal] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(40);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showTimesUpModal, setShowTimesUpModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [questions, setQuestions] = useState(
        Array(40).fill(null).map((_, i) => ({
            id: i + 1,
            status: 'not-attempted',
            answer: null
        }))
    );
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const currentQ = questions.find(q => q.id === currentQuestion);
        if (currentQ && currentQ.answer) {
            setSelectedAnswer(currentQ.answer);
        } else {
            setSelectedAnswer(null);
        }
    }, [currentQuestion, questions]);

    // Derived counts from questions state
    const attemptedCount = questions.filter(q => q.status === 'attempted').length;
    const revisitCount = questions.filter(q => q.status === 'revisit-later').length;
    const unattemptedCount = questions.filter(q => q.status === 'not-attempted').length;

    // Apply filter from modal summary and reveal the panel
    const handleSummaryFilter = (type) => {
        setActiveFilter(type);
        setShowFinishModal(false);
        setShowTimesUpModal(false);
        setIsAllQuestionsPanelOpen(true);
    };
    
    useEffect(() => {
        
        if (location.state?.testData) {
            setTestData(location.state.testData);
        } else {
            const mockData = mockTestData[testId];
            if (mockData) {
                setTestData(mockData);
            } else {
                navigate('/main/practice-tests');
            }
        }
    }, [testId, location.state, navigate]);
    
    if (!testData) {
        return (
            <div className="test-page" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                backgroundColor: '#F5F5F7'
            }}>
                <div className="loading-container" style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <div className="loading-spinner"></div>
                    <p style={{ fontSize: '16px', color: '#666', margin: '0' }}>Loading test...</p>
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
                        TestId: {testId || 'undefined'}
                    </p>
                </div>
            </div>
        );
    }
    

    const updateQuestionStatus = (qId, newStatus, newAnswer = null) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q => {
                if (q.id === qId) {
                    const updatedQ = { ...q, status: newStatus };
                    if (newAnswer !== null) {
                        updatedQ.answer = newAnswer;
                    }
                    if (newStatus === 'revisit-later') {
                        updatedQ.previousStatus = q.status;
                    } else if (q.status === 'revisit-later' && newStatus !== 'revisit-later') {
                        updatedQ.status = q.previousStatus || 'not-attempted';
                    }
                    return updatedQ;
                }
                return q;
            })
        );
    };

    const handleSelectAnswer = (optionId) => {
        setSelectedAnswer(optionId);
        const currentQ = questions.find(q => q.id === currentQuestion);
        if (currentQ && currentQ.status !== 'revisit-later') {
            updateQuestionStatus(currentQuestion, 'attempted', optionId);
        }
    };

    const handleToggleRevisit = () => {
        const currentQ = questions.find(q => q.id === currentQuestion);
        if (currentQ) {
            const newStatus = currentQ.status === 'revisit-later' ? (currentQ.previousStatus || 'not-attempted') : 'revisit-later';
            updateQuestionStatus(currentQuestion, newStatus);
        }
    };
    
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
    

    const allQuestionsDataForPanel = [
        {
            id: 1,
            type: "Single Correct",
            text: "A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be",
            status: "not-answered"
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

        ...Array(Math.max(0, totalQuestions - 3)).fill(null).map((_, i) => ({
            id: i + 4,
            type: "Single Correct",
            text: `This is the placeholder text for question ${i + 4}.`,
            status: "not-answered"
        }))
    ].slice(0, totalQuestions);

    const handleNavigation = (direction) => {
        if (direction === 'next' && currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (direction === 'prev' && currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const toggleAllQuestionsPanel = () => {
        setIsAllQuestionsPanelOpen(!isAllQuestionsPanelOpen);
    };

    const handleQuestionSelectFromPanel = (qNum) => {
        setCurrentQuestion(qNum);
    };

    const handleFinishTest = () => {
        console.log("Finish test clicked");
        setShowFinishModal(true);
    };

    const confirmFinishTest = () => {
        setShowFinishModal(false);
        setShowTimesUpModal(true);
    };

    const handleFinalFinish = () => {
        setShowTimesUpModal(false);
        navigate('/main/practice-tests/results', { 
            state: { 
                testId: testData.id,
                testTitle: testData.title,
                score: '80/120',
                scorePercentage: '66.67%',
                attempted: attemptedCount,
                correct: 28,
                incorrect: 8,
                unattempted: unattemptedCount,
                timeSpent: '119:30'
            } 
        });
    };

    return (
        <>
            {isMobile ? (
                <>
                    <MobileTestView 
                        testData={testData}
                        timeLeft={timeLeft}
                        attemptedCount={attemptedCount}
                        totalQuestions={totalQuestions}
                        currentQuestion={currentQuestion}
                        questionData={questionData}
                        questions={questions}
                        selectedAnswer={selectedAnswer}
                        handleSelectAnswer={handleSelectAnswer}
                        handleNavigation={handleNavigation}
                        handleToggleRevisit={handleToggleRevisit}
                        setShowReportModal={setShowReportModal}
                        setShowExitModal={setShowExitModal}
                        setShowFinishModal={setShowFinishModal}
                        toggleAllQuestionsPanel={toggleAllQuestionsPanel}
                        
                    />
                    {showReportModal && <ReportQuestionModal onClose={() => setShowReportModal(false)} />}

                    <div className={`mobile-sidebar-overlay ${isQuestionsPanelOpen ? 'open' : ''}`} onClick={() => setIsQuestionsPanelOpen(false)}></div>

                    <button className="mobile-sidebar-toggle" onClick={() => setIsQuestionsPanelOpen(!isQuestionsPanelOpen)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="#ffffff" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <div className={`mobile-question-sidebar ${isQuestionsPanelOpen ? 'open' : ''}`}>
                        <div className="sidebar-filter-buttons">
                            <button 
                                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All
                            </button>
                            <button 
                                className={`filter-btn ${activeFilter === 'attempted' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('attempted')}
                            >
                                Attempted
                            </button>
                            <button 
                                className={`filter-btn ${activeFilter === 'not-attempted' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('not-attempted')}
                            >
                                Not Attempted
                            </button>
                            <button 
                                className={`filter-btn ${activeFilter === 'revisit-later' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('revisit-later')}
                            >
                                Visit Later
                            </button>
                        </div>
                        <div className="questions-grid">
                            {questions
                                .filter(q => {
                                    if (activeFilter === 'all') return true;
                                    return q.status === activeFilter;
                                })
                                .map((q) => {
                                    let btnClass = 'q-btn';
                                    if (q.status === 'attempted') btnClass += ' attempted';
                                    if (q.status === 'revisit-later') btnClass += ' revisit-later';
                                    if (q.status === 'not-attempted') btnClass += ' not-attempted';
                                    if (q.id === currentQuestion) btnClass += ' active';
                                    
                                    return (
                                        <button 
                                            key={q.id} 
                                            className={btnClass}
                                            onClick={() => {
                                                setCurrentQuestion(q.id);
                                                setIsQuestionsPanelOpen(false);
                                            }}
                                        >
                                            Q{q.id}
                                        </button>
                                    );
                                })} 
                        </div>
                    </div>
                    {showFinishModal && (
                        <FinishTestModal 
                            onClose={() => setShowFinishModal(false)}
                            onConfirm={confirmFinishTest}
                            onSummaryFilter={handleSummaryFilter}
                            summary={{
                                attempted: attemptedCount,
                                revisit: revisitCount,
                                unattempted: unattemptedCount,
                                timeLeft: '1:30 Min'
                            }}
                        />
                    )}

                    
                </>
            ):(

                <div className="test-page">
                    {showReportModal && <ReportQuestionModal onClose={() => setShowReportModal(false)} />}
                    <div className="test-header">
                        <div className="header-left-content">
                            <img src={logo_short} alt="Perfect Learning Logo" width="48" height="48" />
                            <span>{testData.title}</span>
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
                                <span>Attempted : {attemptedCount}/{totalQuestions}</span>
                            </div>
                        </div>

                        <div className="exit-section" onClick={() => setShowExitModal(true)}>
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
                                <div style={{ display: 'flex', gap: '10px', border: 'none', boxShadow: 'none', background: 'none' }}>
                                    <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }} title="Bookmark this question">
                                        <img src={mcqBookmarkIcon} alt="Bookmark" width="20" height="20" />
                                    </button>
                                    <button style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }} title="Report this question">
                                        <img src={mcqReportIcon} alt="Report" width="20" height="20" onClick={() => setShowReportModal(true)} />
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
                                        onClick={() => handleSelectAnswer(option.id)}
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
                                        checked={questions.find(q => q.id === currentQuestion)?.status === 'revisit-later'}
                                        onChange={handleToggleRevisit}
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
                                            className="nav-btn next" 
                                            onClick={handleFinishTest}
                                        >
                                            Finish
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
                            <div className="sidebar-filter-buttons">
                                <button 
                                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('all')}
                                >
                                    All
                                </button>
                                <button 
                                    className={`filter-btn ${activeFilter === 'attempted' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('attempted')}
                                >
                                    Attempted
                                </button>
                                <button 
                                    className={`filter-btn ${activeFilter === 'not-attempted' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('not-attempted')}
                                >
                                    Not Attempted
                                </button>
                                <button 
                                    className={`filter-btn ${activeFilter === 'revisit-later' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('revisit-later')}
                                >
                                    Visit Later
                                </button>
                            </div>
                            <div className="questions-grid">
                                {questions
                                    .filter(q => {
                                        if (activeFilter === 'all') return true;
                                        return q.status === activeFilter;
                                    })
                                    .map((q) => {
                                        // Determine the class for the question button
                                        let btnClass = 'q-btn';
                                        if (q.status === 'attempted') btnClass += ' attempted';
                                        if (q.status === 'revisit-later') btnClass += ' revisit-later';
                                        if (q.status === 'not-attempted') btnClass += ' not-attempted';
                                        if (q.id === currentQuestion) btnClass += ' active';
                                        
                                        return (
                                            <button 
                                                key={q.id} 
                                                className={btnClass}
                                                onClick={() => setCurrentQuestion(q.id)}
                                            >
                                                Q{q.id}
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
                        <FinishTestModal 
                            onClose={() => setShowFinishModal(false)}
                            onConfirm={confirmFinishTest}
                            onSummaryFilter={handleSummaryFilter}
                            summary={{
                                attempted: attemptedCount,
                                revisit: revisitCount,
                                unattempted: unattemptedCount,
                                timeLeft: '1:30 Min'
                            }}
                        />
                    )}


                </div>
            )}

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


            {/* External */}

            {/* Time's Up Modal */}
            {showTimesUpModal && (
                <div className="times-up-modal-overlay">
                    <div className="times-up-modal">
                        <h2 className="times-up-title">Time's Up!</h2>
                        <p className="times-up-message">
                            Your allotted time for this test has expired. To receive your results, please click 'Finish Test' below
                        </p>
                        <div className="times-up-summary">
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
                                <span className="summary-value">{attemptedCount}</span>
                            </div>
                            <div className="summary-item" >
                                <div className="summary-item-header">
                                    <span className="summary-icon unattempted-icon">
                                        <BsQuestionCircle size={22} color="#475467" />
                                    </span>
                                    <span className="summary-label">Unattempted</span>
                                </div>
                                <span className="summary-value">{unattemptedCount}</span>
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
                                <span className="summary-value red-text">0 Min</span>
                            </div>
                            <div className="summary-item" >
                                <div className="summary-item-header">
                                    <span className="summary-icon revisit-icon">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 10.6667V8M8 5.33333H8.00667M14.6667 8C14.6667 11.6819 11.682 14.6667 8 14.6667C4.31811 14.6667 1.33337 11.6819 1.33337 8C1.33337 4.31811 4.31811 1.33333 8 1.33333C11.682 1.33333 14.6667 4.31811 14.6667 8Z" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                    <span className="summary-label">Revisit Later</span>
                                </div>
                                <span className="summary-value">{revisitCount}</span>
                            </div>
                        </div>
                        <div className="times-up-actions">
                            <button onClick={handleFinalFinish} className="times-up-confirm-btn">
                                Finish test
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exit Confirmation Modal */}
            {showExitModal && (
                <div className="exit-confirm-modal-overlay">
                    <div className="exit-confirm-modal">
                        <button onClick={() => setShowExitModal(false)} className="close-modal-btn" aria-label="Close exit confirmation">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M1 1L13 13" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <h2 className="exit-confirm-title">Are you sure that you would like to Exit the test?</h2>
                        <div className="exit-confirm-actions">
                            <button onClick={() => navigate('/main/practice-tests')} className="exit-confirm-btn">
                                Confirm Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </>
    );
};

export default TestPage;
