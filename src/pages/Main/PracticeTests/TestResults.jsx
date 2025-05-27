import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TestResults.css';
import logo_short from '/assets/logo_short.svg';
import { ReactComponent as ChartTrophyIcon } from '../../../icons/column-chart-trophy-icon.svg';
import { ReactComponent as ChartStarIcon } from '../../../icons/column-chart-star-icon.svg';
import { ReactComponent as ChartWarningIcon } from '../../../icons/column-chart-warning-icon.svg';

const TestResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const testData = location.state || {
        testId: '2023-IIT JEE Mains Paper 1',
        score: '80/120',
        scorePercentage: '66.67%',
        attempted: 36,
        correct: 28,
        incorrect: 8,
        unattempted: 4,
        timeSpent: '119:30'
    };



    // Sample subject data for the charts
    const subjectData = [
        { name: 'Mathematics', correct: 10, incorrect: 2, unattempted: 1, partiallyCorrect: 0 },
        { name: 'Physics', correct: 9, incorrect: 3, unattempted: 2, partiallyCorrect: 1 },
        { name: 'Chemistry', correct: 9, incorrect: 3, unattempted: 1, partiallyCorrect: 0 }
    ];

    // Sample question data
    const questionData = [
        {
            id: 1,
            type: 'Single Correct',
            text: 'A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be',
            options: [
                { id: 'A', text: '350', isCorrect: true, isSelected: true },
                { id: 'B', text: '75', isCorrect: false, isSelected: false },
                { id: 'C', text: '50', isCorrect: false, isSelected: false },
                { id: 'D', text: '525', isCorrect: false, isSelected: false }
            ],
            userAnswer: 'A',
            correctAnswer: 'A',
            isCorrect: true
        },
        {
            id: 2,
            type: 'Single Correct',
            text: 'A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be',
            options: [
                { id: 'A', text: '350', isCorrect: false, isSelected: true },
                { id: 'B', text: '75', isCorrect: true, isSelected: false },
                { id: 'C', text: '50', isCorrect: false, isSelected: false },
                { id: 'D', text: '525', isCorrect: false, isSelected: false }
            ],
            userAnswer: 'A',
            correctAnswer: 'B',
            isCorrect: false
        }
    ];

    const handleBackToTests = () => {
        navigate('/main/practice-tests');
    };

    return (
        <div className="test-results-page">
            <div className="test-results-header">
                <div className="test-results-header-left">
                    <img src={logo_short} alt="Perfect Learning Logo" className="test-results-logo" />
                    <h1>Mock Tests / Test Summary - {testData.testId}</h1>
                </div>
                <div className="test-results-header-right">
                    <span>Test taken on: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="results-cards-row">
                <div className="result-card test-score-value-card">
                    <h2>Test Score</h2>
                    <div className="score-display">
                        <h3>{testData.score}</h3>
                    </div>
                    <div className="score-note">
                        <p>You did better than <strong>70% of your peers</strong></p>
                    </div>
                </div>
                
                <div className="result-card test-percentage-value-card">
                    <h2>Score Percentage</h2>    
                    <div className="score-percentage">
                        <h4>{testData.scorePercentage}</h4>
                    </div>
                    <div className="score-note">
                        <p>Avg. Percentage by peers: <strong>50%</strong></p>
                    </div>
                </div>
            
                <div className="subject-performance-card">
                    <h2>Subject wise score Percentage</h2>
                    <div className="chart-container">
                        <div className="bar-graph-row" style={{ borderBottom: '2px solid #e0e0e0', marginBottom: '30px' }}>
                            <div className="bar-column">
                                <div className="percentage-label" style={{ color: '#8AB654' }}>86%</div>
                                <div style={{ position: 'relative' }}>
                                    <div className="bar" style={{ backgroundColor: '#C4DD9B', height: 'calc(86% * 1.2)' }}></div>
                                    <ChartTrophyIcon className="test-results-chart-icon green" />
                                </div>
                                <div className="subject-name">Mathematics</div>
                            </div>
                            
                            <div className="bar-column">
                                <div className="percentage-label" style={{ color: '#4A90E2' }}>78%</div>
                                <div style={{ position: 'relative' }}>
                                    <div className="bar" style={{ backgroundColor: '#B0CCE7', height: 'calc(78% * 1.2)' }}></div>
                                    <ChartStarIcon className="test-results-chart-icon blue" />
                                </div>
                                <div className="subject-name">Physics</div>
                            </div>
                            
                            <div className="bar-column">
                                <div className="percentage-label" style={{ color: '#4A90E2' }}>65%</div>
                                <ChartStarIcon className="test-results-chart-icon blue" />
                                <div className="bar" style={{ backgroundColor: '#B0CCE7', height: 'calc(78% * 1.2)' }}></div>
                                <div className="subject-name">Chemistry</div>
                            </div>
                            
                            <div className="bar-column">
                                <div className="percentage-label" style={{ color: '#FF9800' }}>50%</div>
                                <div style={{ position: 'relative' }}>
                                    <div className="bar" style={{ backgroundColor: '#FFCFB6', height: 'calc(50% * 1.2)' }}></div>
                                    <ChartWarningIcon className="test-results-chart-icon orange" />
                                </div>
                                <div className="subject-name">Another Subject</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="subject-wise-summary">
                <h2>Subject wise Summary</h2>
                <div className="subject-summary-charts">
                    {subjectData.map((subject, index) => {
                        const total = subject.correct + subject.incorrect + subject.unattempted + subject.partiallyCorrect;
                        return (
                            <div key={index} className="subject-summary-chart">
                                <h3>{subject.name}</h3>
                                <div className="chart-bars">
                                    <div className="chart-bar" style={{ height: "200px", backgroundColor: "#B0CCE7" }}>
                                        <div className="bar-value">{total}</div>
                                        <div className="bar-label">All Questions</div>
                                    </div>
                                    <div className="chart-bar" style={{ height: `${(subject.correct + subject.incorrect + subject.partiallyCorrect) * 200 / total}px`, backgroundColor: "#FFCFB6" }}>
                                        <div className="bar-value">{subject.correct + subject.incorrect + subject.partiallyCorrect}</div>
                                        <div className="bar-label">Attempted</div>
                                    </div>
                                    <div className="chart-bar" style={{ height: `${subject.correct * 200 / total}px`, backgroundColor: "#C4DD9B" }}>
                                        <div className="bar-value">{subject.correct}</div>
                                        <div className="bar-label">Correct</div>
                                    </div>
                                    <div className="chart-bar" style={{ height: `${subject.incorrect * 200 / total}px`, backgroundColor: "#F87171" }}>
                                        <div className="bar-value">{subject.incorrect}</div>
                                        <div className="bar-label">Incorrect</div>
                                    </div>
                                    <div className="chart-bar" style={{ height: `${subject.unattempted * 200 / total}px`, backgroundColor: "#D9F99D" }}>
                                        <div className="bar-value">{subject.unattempted}</div>
                                        <div className="bar-label">Unattempted</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="test-stats-summary">
                <div className="stat-item">
                    <h3>All Questions</h3>
                    <div className="stat-value">40</div>
                </div>
                <div className="stat-item">
                    <h3>Attempted</h3>
                    <div className="stat-value">{testData.attempted}</div>
                </div>
                <div className="stat-item">
                    <h3>Unattempted</h3>
                    <div className="stat-value">{testData.unattempted}</div>
                </div>
                <div className="stat-item">
                    <h3>Correct Answers</h3>
                    <div className="stat-value">{testData.correct}</div>
                </div>
                <div className="stat-item">
                    <h3>Incorrect Answers</h3>
                    <div className="stat-value">{testData.incorrect}</div>
                </div>
            </div>

            <div className="questions-review-section">
                {questionData.map((question, index) => (
                    <div key={index} className={`question-review-card ${question.isCorrect ? 'correct' : 'incorrect'}`}>
                        <div className="question-header">
                            <span className="question-id">Q{question.id} ({question.type})</span>
                            <span className="time-spent">Time: 30sec</span>
                        </div>
                        <div className="question-text">
                            <p>{question.text}</p>
                        </div>
                        <div className="question-scoring">
                            <span className="correct-score">Correct: +3</span>
                            <span className="wrong-score">Wrong: -1</span>
                        </div>
                        <div className="options-container">
                            {question.options.map((option) => (
                                <div 
                                    key={option.id} 
                                    className={`option ${option.isSelected ? 'selected' : ''} ${option.isCorrect ? 'correct' : ''}`}
                                >
                                    <div className="option-radio">
                                        {option.isSelected && <div className="radio-inner"></div>}
                                    </div>
                                    <div className="option-id">({option.id})</div>
                                    <div className="option-text">{option.text}</div>
                                </div>
                            ))}
                        </div>
                        <div className="answer-status">
                            <p>You selected: <strong>{question.userAnswer}</strong> (The correct answer is {question.correctAnswer})</p>
                        </div>
                        <div className="question-actions">
                            <button className="action-btn bookmark">Bookmark</button>
                            <button className="action-btn solution">Solution</button>
                            <button className="action-btn report">Report Issue</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="back-to-tests">
                <button onClick={handleBackToTests} className="back-btn">
                    Back to Tests
                </button>
            </div>
        </div>
    );
};

export default TestResults;
