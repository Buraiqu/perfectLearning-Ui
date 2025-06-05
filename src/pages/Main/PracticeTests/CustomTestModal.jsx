import React, { useState } from 'react';
import './CustomTestModal.css';
import closeIcon from '../../../icons/close-icon.svg';
import editIcon from '../../../icons/edit-icon.svg';

const CustomTestModal = ({ isOpen, onClose, onCreateTest }) => {
  const [step, setStep] = useState(1);
  const [testData, setTestData] = useState({
    testName: 'Custom Test 1',
    subjects: [],
    totalQuestions: 0,
    timeLimit: 60, // Default 60 minutes
  });

  // Available subjects with topics and images
  const availableSubjects = [
    {
      id: 1,
      name: 'Mathematics',
      image: 'https://via.placeholder.com/150x100',
      topics: ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics']
    },
    {
      id: 2,
      name: 'Physics',
      image: 'https://via.placeholder.com/150x100',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics']
    },
    {
      id: 3,
      name: 'Chemistry',
      image: 'https://via.placeholder.com/150x100',
      topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry']
    }
  ];

  // Handle subject selection with topic and question count
  const handleSubjectSelect = (subjectId) => {
    const isSelected = testData.subjects.some(s => s.id === subjectId);
    
    if (isSelected) {
      // Remove subject if already selected
      setTestData({
        ...testData,
        subjects: testData.subjects.filter(s => s.id !== subjectId),
        totalQuestions: calculateTotalQuestions(testData.subjects.filter(s => s.id !== subjectId))
      });
    } else {
      // Add subject with default values
      const subject = availableSubjects.find(s => s.id === subjectId);
      const newSubject = {
        id: subject.id,
        name: subject.name,
        topics: subject.topics.map(topic => ({ name: topic, selected: false })),
        questionCount: 0
      };
      
      setTestData({
        ...testData,
        subjects: [...testData.subjects, newSubject],
        totalQuestions: calculateTotalQuestions([...testData.subjects, newSubject])
      });
    }
  };

  // Calculate total questions
  const calculateTotalQuestions = (subjects) => {
    return subjects.reduce((total, subject) => total + subject.questionCount, 0);
  };

  // Handle topic selection
  const handleTopicSelect = (subjectId, topicName) => {
    const updatedSubjects = testData.subjects.map(subject => {
      if (subject.id === subjectId) {
        const updatedTopics = subject.topics.map(topic => {
          if (topic.name === topicName) {
            return { ...topic, selected: !topic.selected };
          }
          return topic;
        });
        return { ...subject, topics: updatedTopics };
      }
      return subject;
    });

    setTestData({
      ...testData,
      subjects: updatedSubjects
    });
  };

  // Handle question count change
  const handleQuestionCountChange = (subjectId, count) => {
    const updatedSubjects = testData.subjects.map(subject => {
      if (subject.id === subjectId) {
        return { ...subject, questionCount: parseInt(count) || 0 };
      }
      return subject;
    });

    setTestData({
      ...testData,
      subjects: updatedSubjects,
      totalQuestions: calculateTotalQuestions(updatedSubjects)
    });
  };

  // Handle time limit change
  const handleTimeLimitChange = (minutes) => {
    setTestData({
      ...testData,
      timeLimit: parseInt(minutes) || 60
    });
  };

  // Handle test name change
  const handleTestNameChange = (name) => {
    setTestData({
      ...testData,
      testName: name
    });
  };

  // Move to next step
  const handleNextStep = () => {
    setStep(2);
  };

  // Move back to previous step
  const handlePreviousStep = () => {
    setStep(1);
  };

  // Handle final submission
  const handleSubmit = () => {
    onCreateTest(testData);
    onClose();
  };

  // Check if step 1 is valid to proceed
  const isStep1Valid = () => {
    return testData.subjects.length > 0 && 
           testData.subjects.some(subject => 
             subject.topics.some(topic => topic.selected) && 
             subject.questionCount > 0
           );
  };

  // Check if step 2 is valid to submit
  const isStep2Valid = () => {
    return testData.testName.trim() !== '' && 
           testData.timeLimit > 0 && 
           testData.totalQuestions > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="custom-test-modal-overlay">
      <div className="custom-test-modal">
        <div className="custom-test-modal-header">
          <div className="title-container">
            <h2>Custom Test 1</h2>
            <img src={editIcon} alt="Edit" className="edit-icon" />
          </div>
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <div className="progress-indicator">
          <div className={`progress-bar ${step === 1 ? 'step-1' : 'step-2'}`}></div>
        </div>

        {step === 1 ? (
          <div className="custom-test-modal-content">
            <h3>Choose your subjects</h3>
            
            <div className="all-subjects-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  onChange={() => {
                    // Logic to select/deselect all subjects
                    if (testData.subjects.length === availableSubjects.length) {
                      setTestData({
                        ...testData,
                        subjects: []
                      });
                    } else {
                      const allSubjects = availableSubjects.map(subject => ({
                        id: subject.id,
                        name: subject.name,
                        topics: subject.topics.map(topic => ({ name: topic, selected: false })),
                        questionCount: 5 // Default question count
                      }));
                      setTestData({
                        ...testData,
                        subjects: allSubjects,
                        totalQuestions: allSubjects.length * 5
                      });
                    }
                  }}
                  checked={testData.subjects.length === availableSubjects.length}
                />
                <span className="checkmark"></span>
                <span className="subject-name">All Subjects</span>
              </label>
            </div>
            
            <div className="subject-cards-container">
              {availableSubjects.map(subject => (
                <div 
                  key={subject.id} 
                  className={`subject-card ${testData.subjects.some(s => s.id === subject.id) ? 'selected' : ''}`}
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <img src={subject.image} alt={subject.name} className="subject-image" />
                  <div className="subject-card-name">{subject.name}</div>
                </div>
              ))}
            </div>
            
            <h3>Select topics</h3>
            
            <div className="topic-selection-radio">
              <label className="radio-container">
                <input
                  type="radio"
                  name="topicSelection"
                  checked={true}
                />
                <span className="radio-mark"></span>
                <span className="topic-option">All Topics</span>
              </label>
              
              <label className="radio-container">
                <input
                  type="radio"
                  name="topicSelection"
                  checked={false}
                />
                <span className="radio-mark"></span>
                <span className="topic-option">Completed Topics</span>
              </label>
            </div>
            
            <div className="modal-footer">
              <button 
                className="next-button" 
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="custom-test-modal-content">
            <h3>Step 2 content would go here</h3>
            
            <div className="modal-footer">
              <button className="back-button" onClick={handlePreviousStep}>Back</button>
              <button 
                className="create-button" 
                onClick={handleSubmit}
              >
                Create Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTestModal;
