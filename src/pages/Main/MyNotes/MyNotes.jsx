import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyNotes.css';
import MathImage from '../../../icons/math-image.svg';
import PhysicsImage from '../../../icons/physics-image.svg';
import ChemistryImage from '../../../icons/chemistry-image.svg';

const MyNotes = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const subjects = [
    {
      name: 'Mathematics',
      image: MathImage,
      topics: [
        { name: 'Sets, Relations, and Functions', bookmarks: 20, notesAdded: true },
        { name: 'Inequalities, Modulus and Logarithms', bookmarks: 0, notesAdded: false },
        { name: 'Relations & Functions 1', bookmarks: 0, notesAdded: false },
        { name: 'Quadratic Equations', bookmarks: 0, notesAdded: false },
      ],
    },
    {
      name: 'Physics',
      image: PhysicsImage,
      topics: [
        { name: 'Mechanics', bookmarks: 5, notesAdded: true },
        { name: 'Thermodynamics', bookmarks: 0, notesAdded: false },
        { name: 'Electromagnetism', bookmarks: 0, notesAdded: false },
      ],
    },
    {
      name: 'Chemistry',
      image: ChemistryImage,
      topics: [
        { name: 'Organic Chemistry', bookmarks: 0, notesAdded: false },
        { name: 'Inorganic Chemistry', bookmarks: 0, notesAdded: false },
        { name: 'Physical Chemistry', bookmarks: 0, notesAdded: false },
      ],
    },
  ];

  const handleSubjectClick = (subjectName) => {
    if (subjectName === selectedSubject) {
      setSelectedSubject(null);
      setSelectedTopic(null);
    } else {
      setSelectedSubject(subjectName);
      setSelectedTopic(null);
    }
  };
  
  const handleTopicClick = (topicName, subject) => {
    setSelectedTopic(topicName === selectedTopic ? null : topicName);
    
    // Navigate to the bookmarked questions page when a topic is selected
    if (topicName !== selectedTopic) {
      navigate(`/main/bookmarked-questions/${subject}/${topicName}`);
    }
  };

  return (
    <div className="mynotes-main-container">
      <h2 className="mynotes-subject-title">Pick a subject</h2>
      <div className="mynotes-subjects-grid">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className={`mynotes-subject-card ${selectedSubject === subject.name ? 'mynotes-subject-card-selected' : ''}`}
            onClick={() => handleSubjectClick(subject.name)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleSubjectClick(subject.name)}
          >
            <div className="mynotes-card-inner">
              <img src={subject.image} alt={subject.name} className="mynotes-subject-img" />
              <div className="mynotes-subject-label">{subject.name}</div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedSubject && (
        <div className="mynotes-topics-container">
          <h3 className="mynotes-topics-title">Select a topic</h3>
          <div className="mynotes-topics-list">
            {subjects.find(subject => subject.name === selectedSubject)?.topics.map((topic) => (
              <div 
                key={topic.name} 
                className={`mynotes-topic-item ${topic.name === selectedTopic ? 'mynotes-topic-item-selected' : ''}`}
                onClick={() => handleTopicClick(topic.name, selectedSubject)}
              >
                <div className="mynotes-topic-name">{topic.name}</div>
                <div className="mynotes-topic-info">
                  {topic.bookmarks > 0 ? (
                    <span className="mynotes-bookmarks">{topic.bookmarks} Bookmarks</span>
                  ) : (
                    <span className="mynotes-no-bookmarks">No Bookmarks yet</span>
                  )}
                  {topic.notesAdded && <span className="mynotes-notes-added">Notes Added</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNotes;
