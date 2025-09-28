import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ColumnChartWithImages from '../../../components/Charts/ColumnChartWithImages';
import SubjectBarChart from '../../../components/Charts/SubjectBarChart';
import chartStarIcon from '../../../icons/column-chart-star-icon.svg';
import chartWarningIcon from '../../../icons/column-chart-warning-icon.svg';
import chartTrophyIcon from '../../../icons/column-chart-trophy-icon.svg';
import bookmarkIcon from '../../../icons/test-result-question-review-bookmark.svg';
import solutionIcon from '../../../icons/test-result-question-review-solution.svg';
import correctPercentIcon from '../../../icons/test-result-question-review-correct.svg';
import reportIssueIcon from '../../../icons/test-result-question-review-report-issue.svg';
import './QuestionReview.css';
import './TestResults.css';

const mockData = {
  testName: "JEE Advanced Mock Test 1",
  totalScore: 80,
  totalQuestions: 120,
  scorePercentage: 66.67,
  peerAverage: 58,
  subjectScores: [
    { subject: "Mathematics", percentage: 70 },
    { subject: "Physics", percentage: 60 },
    { subject: "Chemistry", percentage: 75 }
  ],
  questions: [
    {
      id: 1, status: 'correct', text: "What is the derivative of f(x) = x²?",
      options: ["2x", "x", "x³", "2"], userAnswer: 0, correctAnswer: 0,
      difficulty: "Medium", timeTaken: 45, subject: "Mathematics"
    },
    {
      id: 2, status: 'incorrect', text: "What is the integral of 1/x?",
      options: ["ln(x)", "1", "-1/x²", "x"], userAnswer: 1, correctAnswer: 0,
      difficulty: "Easy", timeTaken: 30, subject: "Physics"
    },
    {
      id: 3, status: 'unattempted', text: "What is the value of e^(iπ)?",
      options: ["-1", "1", "0", "i"], userAnswer: null, correctAnswer: 0,
      difficulty: "Hard", timeTaken: 0, subject: "Mathematics"
    },
    {
      id: 4, status: 'correct', text: "What is the formula for momentum?",
      options: ["p = mv", "F = ma", "E = mc²", "v = d/t"], userAnswer: 0, correctAnswer: 0,
      difficulty: "Easy", timeTaken: 25, subject: "Physics"
    },
    {
      id: 5, status: 'incorrect', text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"], userAnswer: 0, correctAnswer: 1,
      difficulty: "Easy", timeTaken: 15, subject: "Chemistry"
    }
  ],
  statistics: {
    allQuestions: 40,
    attempted: 35,
    unattempted: 5,
    correct: 25,
    incorrect: 10
  }
};

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const testData = location.state?.testData || mockData;

  const [selectedStat, setSelectedStat] = useState('all');
  const [filteredQuestions, setFilteredQuestions] = useState(testData.questions);
  const chartRef = useRef(null);
  const subjectChartRefs = useRef([]);

  useEffect(() => {
    let questionsToShow = [];
    if (selectedStat === 'all') {
      questionsToShow = testData.questions;
    } else if (selectedStat === 'correct') {
      questionsToShow = testData.questions.filter(q => q.status === 'correct');
    } else if (selectedStat === 'incorrect') {
      questionsToShow = testData.questions.filter(q => q.status === 'incorrect');
    } else if (selectedStat === 'unattempted') {
      questionsToShow = testData.questions.filter(q => q.status === 'unattempted');
    } else if (selectedStat === 'attempted') {
      questionsToShow = testData.questions.filter(q => q.status === 'correct' || q.status === 'incorrect');
    }
    setFilteredQuestions(questionsToShow);
  }, [selectedStat, testData.questions]);
  
  
  const handleExitClick = () => {
    navigate('/main/practice-tests');
  };

  // Fix for breadcrumb navigation
  const handleBackToDashboard = () => {
    navigate('/main/practice-tests');
  };

  const handleStatSelect = (statId) => {
    setSelectedStat(statId);
  };
  
  
  const prepareSubjectChartData = () => {
  
    return testData.subjectScores.map(subject => {
      let color, iconSrc;
      
      if (subject.subject === "Mathematics") {
        color = "#C4DD9B";
        iconSrc = chartTrophyIcon;
      } else if (subject.subject === "Physics") {
        color = "#B0CCE7";
        iconSrc = chartStarIcon;
      } else if (subject.subject === "Chemistry") {
        color = "#B0CCE7";
        iconSrc = chartStarIcon;
      } else {
        color = "#FFCFB6";
        iconSrc = chartWarningIcon;
      }
      
      return {
        name: subject.subject,
        value: subject.percentage,
        color: color,
        bulletSettings: {
          src: iconSrc
        }
      };
    });
  };
  
  return (
    
      <div className="content-viewer">
        <div className="content-viewer-header" style={{paddingLeft: '22px'}}>
          <div className="content-viewer-breadcrumb">
            <span>
              <span className="breadcrumb-item" onClick={handleBackToDashboard}>Dashboard</span>
              <span className="breadcrumb-separator"> &gt; </span>
              <span className="breadcrumb-item" onClick={handleBackToDashboard}>Practice Tests</span>
              <span className="breadcrumb-separator"> &gt; </span>
              <span className="breadcrumb-item last-item">Test Results</span>
            </span>
          </div>
        </div>
        <div className="content-viewer-body">
          <div className="content-viewer-container">
            <div className="test-results-content">
              <div className="results-container">
                <div className="score-cards">
                  <div className="score-card">
                    <h3>Test Score</h3>
                    <div className="score-value">{testData.totalScore}/{testData.totalQuestions}</div>
                    <div className="score-comparison">
                      Better than <span className="highlight">60%</span> of peers
                    </div>
                  </div>
                  
                  <div className="score-card">
                    <h3>Score Percentage</h3>
                    <div className="score-value">{testData.scorePercentage}%</div>
                    <div className="score-comparison">
                      Peer average: <span className="highlight">{testData.peerAverage}%</span>
                    </div>
                  </div>
                  
                  <div className="score-card">
                    <div className="score-title">Subject wise score</div>
                    <div className="subject-percentage-chart">
                      <ColumnChartWithImages data={prepareSubjectChartData()} />
                    </div>
                  </div>
                </div>
              
              <div className="subject-wise-summary-section">
                <h3 className="subject-wise-summary-title">Subject wise Summary</h3>
                <div className="subject-wise-summary-chart-container">
                  <SubjectBarChart data={[
                    {
                      category: "Mathematics",
                      allQuestions: 20,
                      attempted: 15,
                      correct: 10,
                      incorrect: 4,
                      unattempted: 1
                    },
                    {
                      category: "Physics",
                      allQuestions: 20,
                      attempted: 15,
                      correct: 10,
                      incorrect: 4,
                      unattempted: 1
                    },
                    {
                      category: "Chemistry",
                      allQuestions: 20,
                      attempted: 15,
                      correct: 10,
                      incorrect: 4,
                      unattempted: 1
                    }
                  ]} />
                </div>
              </div>
              
              <div className="question-review-section">
                <div className="test-stats-section">
                  {[ 
                    { id: 'all', title: 'All Questions', value: testData.questions.length, className: 'all-questions' },
                    { id: 'attempted', title: 'Attempted', value: testData.questions.filter(q => q.status !== 'unattempted').length, className: '' },
                    { id: 'unattempted', title: 'Unattempted', value: testData.questions.filter(q => q.status === 'unattempted').length, className: 'unattempted' },
                    { id: 'correct', title: 'Correct Answers', value: testData.questions.filter(q => q.status === 'correct').length, className: 'correct' },
                    { id: 'incorrect', title: 'Incorrect Answers', value: testData.questions.filter(q => q.status === 'incorrect').length, className: 'incorrect' }
                  ].map(stat => (
                    <div 
                      key={stat.id}
                      className={`stat-box ${stat.className} ${selectedStat === stat.id ? 'active' : ''}`}
                      onClick={() => handleStatSelect(stat.id)}
                    >
                      <div className="stat-title">{stat.title}</div>
                      <div className="stat-value">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="questions-list">
                  {filteredQuestions.map((question, index) => (
                    <div className="question-review" key={question.id}>
                      <div className="question-header">
                        <div className="question-number">Q{index + 1} (Single Correct)</div>
                        <div className="question-time">
                          <span className="time-icon"></span>
                          <span>{question.timeTaken} sec</span>
                        </div>
                      </div>
                      
                      <div className="question-text">{question.text}</div>
                      
                      <div className="scoring-info-container">
                        <div className="scoring-info">
                          <span className="correct-score">Correct: +3</span>
                          <span className="wrong-score">Wrong: -1</span>
                        </div>
                      </div>
                      
                      <div className="test-options-container">
                        {question.options.map((option, i) => (
                          <div 
                            key={i}
                            className={`test-option ${
                              i === question.correctAnswer ? 'test-correct' : ''
                            } ${
                              i === question.userAnswer && i !== question.correctAnswer ? 'test-selected-wrong' : ''
                            } ${
                              question.userAnswer === null ? 'test-unattempted' : ''
                            }`}>
                            <div className="test-option-marker"></div>
                            <div className="test-option-text">{option}</div>
                            {i === question.correctAnswer && <div className="test-correct-answer-label">Correct Answer</div>}
                          </div>
                        ))}
                      </div>
                      
                      {question.status === 'incorrect' && 
                        <div className="answer-feedback">
                          <span>You scored -1 for wrong answer</span>
                        </div>
                      }
                      
                      <div className="question-actions">
                        <button className="action-button bookmark">
                          <img src={bookmarkIcon} alt="Bookmark" className="action-icon" />
                          <span>Bookmark</span>
                        </button>
                        <button className="action-button solution">
                          <img src={solutionIcon} alt="Solution" className="action-icon" />
                          <span>Solution</span>
                        </button>
                        <button className="action-button correct-page">
                          <img src={correctPercentIcon} alt="Correct Percentage" className="action-icon" />
                          <span>Correct %age</span>
                        </button>
                        <button className="action-button report">
                          <img src={reportIssueIcon} alt="Report Issue" className="action-icon" />
                          <span>Report Issue</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
              </div>
              </div>
              

            </div>
            
            <button className="nav-button" onClick={handleExitClick} style={{marginBottom: "20px", marginTop: "20px"}}>
              Return to Practice Tests
            </button>
          </div>
        </div>
     
   
  );
};


export default TestResults;
