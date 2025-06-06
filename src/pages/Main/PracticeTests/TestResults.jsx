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

// SVG icons imported above

const TestResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const chartRef = useRef(null);
  const subjectChartRefs = useRef([]);
  
  // Get test data from location state or use mock data
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
        id: 1,
        text: "What is the derivative of f(x) = x² with respect to x?",
        options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
        correctAnswer: 1,
        userAnswer: 1,
        difficulty: "Medium",
        timeTaken: 45,
        subject: "Mathematics"
      },
      {
        id: 2,
        text: "Which of the following is Newton's first law?",
        options: [
          "Force equals mass times acceleration", 
          "An object at rest stays at rest unless acted upon by a force", 
          "For every action, there is an equal and opposite reaction", 
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: 1,
        userAnswer: 2,
        difficulty: "Easy",
        timeTaken: 30,
        subject: "Physics"
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

  // Use location state if available, otherwise use mock data
  const testData = location.state?.testData || mockData;
  
  const handleExitClick = () => {
    navigate('/main/practice-tests');
  };

  // Fix for breadcrumb navigation
  const handleBackToDashboard = () => {
    navigate('/main/practice-tests');
  };
  
  const handlePrevQuestion = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => Math.min(testData.questions.length - 1, prev + 1));
  };
  
  // Prepare data for the ColumnChartWithImages component
  const prepareSubjectChartData = () => {
    // Transform the subject scores data into the format expected by ColumnChartWithImages
    return testData.subjectScores.map(subject => {
      let color, iconSrc;
      
      if (subject.subject === "Mathematics") {
        color = "#C4DD9B";
        iconSrc = chartTrophyIcon;
      } else if (subject.subject === "Physics") {
        color = "#B0CCE7";
        iconSrc = chartStarIcon; // Using star logo for Physics
      } else if (subject.subject === "Chemistry") {
        color = "#B0CCE7"; // Using blue color for Chemistry
        iconSrc = chartStarIcon; // Using star logo for Chemistry
      } else {
        color = "#FFCFB6";
        iconSrc = chartWarningIcon; // Using chemistry logo (warning icon) for other subjects
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
  
  // Always add a fourth subject with the warning icon
  const getChartData = () => {
    const data = prepareSubjectChartData();
    // Always add "Another Subject" with warning icon
    data.push({
      name: "Another Subject",
      value: 50,
      color: "#FFCFB6",
      bulletSettings: {
        src: chartWarningIcon // Using warning icon for the fourth subject
      }
    });
    return data;
  };
  
  return (
    
      <div className="content-viewer">
        <div className="content-viewer-header">
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
                {/* Score Cards Section */}
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
                      <ColumnChartWithImages data={getChartData()} />
                    </div>
                  </div>
                </div>
              
              {/* Subject-wise Summary Section */}
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
              
              {/* Question Review Section */}
              <div className="question-review-section">
                {/* Test Statistics Section */}
                <div className="test-stats-section">
                  <div className="stat-box all-questions">
                    <div className="stat-title">All Questions</div>
                    <div className="stat-value">40</div>
                  </div>
                  
                  <div className="stat-box">
                    <div className="stat-title">Attempted</div>
                    <div className="stat-value">36</div>
                  </div>
                  
                  <div className="stat-box">
                    <div className="stat-title">Unattempted</div>
                    <div className="stat-value">4</div>
                  </div>
                  
                  <div className="stat-box">
                    <div className="stat-title">Correct Answers</div>
                    <div className="stat-value">25</div>
                  </div>
                  
                  <div className="stat-box">
                    <div className="stat-title">Incorrect Answers</div>
                    <div className="stat-value">11</div>
                  </div>
                </div>
                <div className="question-review">
                  <div className="question-header">
                    <div className="question-number">Q1 (Single Correct)</div>
                    <div className="question-time">
                      <span className="time-icon"></span>
                      <span>2min 30sec</span>
                    </div>
                  </div>
                  
                  <div className="question-text">
                    A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be
                  </div>
                  
                  <div className="scoring-info-container">
                    <div className="scoring-info">
                      <span className="correct-score">Correct: +3</span>
                      <span className="wrong-score">Wrong: -1</span>
                    </div>
                  </div>
                  
                  <div className="test-options-container">
                    <div className="test-option test-selected-wrong">
                      <div className="test-option-marker">
                        <span className="test-user-selected-indicator"></span>
                      </div>
                      <div className="test-option-text">350</div>
                    </div>
                    
                    <div className="test-option test-correct">
                      <div className="test-option-marker"></div>
                      <div className="test-option-text">75</div>
                      <div className="test-correct-answer-label">Correct Answer</div>
                    </div>
                    
                    <div className="test-option">
                      <div className="test-option-marker"></div>
                      <div className="test-option-text">50</div>
                    </div>
                    
                    <div className="test-option">
                      <div className="test-option-marker"></div>
                      <div className="test-option-text">525</div>
                    </div>
                  </div>
                  
                  <div className="answer-feedback">
                    <span>You scored -1 for wrong answer</span>
                  </div>
                  
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
