import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestNavigator = () => {
  const navigate = useNavigate();

  const handleNavigateToResults = () => {
    // Navigate to the TestResults page with mock data
    navigate('/main/practice-tests/results', {
      state: {
        testId: 'Test Series: JEE Main Mock Paper 1',
        score: '80/120',
        scorePercentage: '66.67%',
        attempted: 35,
        correct: 25,
        incorrect: 11,
        unattempted: 4,
        timeSpent: '1h 45m',
        totalQuestions: 40,
        subjectScores: [
          { subject: 'Mathematics', percentage: 75, color: '#4285F4' },
          { subject: 'Physics', percentage: 60, color: '#34A853' },
          { subject: 'Chemistry', percentage: 55, color: '#EA4335' }
        ],
        subjectDetails: [
          {
            subject: 'Mathematics',
            metrics: [
              { name: 'Attempted', value: 80, color: '#4285F4' },
              { name: 'Correct', value: 70, color: '#34A853' },
              { name: 'Incorrect', value: 10, color: '#EA4335' },
              { name: 'Skipped', value: 20, color: '#FBBC05' }
            ]
          },
          {
            subject: 'Physics',
            metrics: [
              { name: 'Attempted', value: 70, color: '#4285F4' },
              { name: 'Correct', value: 60, color: '#34A853' },
              { name: 'Incorrect', value: 10, color: '#EA4335' },
              { name: 'Skipped', value: 30, color: '#FBBC05' }
            ]
          },
          {
            subject: 'Chemistry',
            metrics: [
              { name: 'Attempted', value: 65, color: '#4285F4' },
              { name: 'Correct', value: 55, color: '#34A853' },
              { name: 'Incorrect', value: 10, color: '#EA4335' },
              { name: 'Skipped', value: 35, color: '#FBBC05' }
            ]
          }
        ],
        questions: [
          {
            id: 1,
            text: 'A test particle has de-Broglie wavelength λ when moving with speed v. If its speed becomes v/2, then its de-Broglie wavelength will be:',
            options: [
              { id: 'A', text: 'λ' },
              { id: 'B', text: '2λ' },
              { id: 'C', text: 'λ/2' },
              { id: 'D', text: '4λ' },
            ],
            userAnswer: 'A',
            correctAnswer: 'B',
            explanation: 'The de-Broglie wavelength λ = h/p = h/(mv), where h is Planck\'s constant, p is momentum, m is mass, and v is velocity. If v becomes v/2, then λ becomes 2λ.'
          },
          {
            id: 2,
            text: 'A test particle has de-Broglie wavelength λ when moving with speed v. If its speed becomes v/2, then its de-Broglie wavelength will be:',
            options: [
              { id: 'A', text: 'λ' },
              { id: 'B', text: '2λ' },
              { id: 'C', text: 'λ/2' },
              { id: 'D', text: '4λ' },
            ],
            userAnswer: 'B',
            correctAnswer: 'B',
            explanation: 'The de-Broglie wavelength λ = h/p = h/(mv), where h is Planck\'s constant, p is momentum, m is mass, and v is velocity. If v becomes v/2, then λ becomes 2λ.'
          }
        ]
      }
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Navigator</h1>
      <p>Click the button below to navigate to the TestResults page</p>
      <button 
        onClick={handleNavigateToResults}
        style={{
          padding: '10px 20px',
          backgroundColor: '#003986',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        View Test Results
      </button>
    </div>
  );
};

export default TestNavigator;
