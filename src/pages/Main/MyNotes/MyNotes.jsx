import React from 'react';
import './MyNotes.css';
import { useState } from 'react';
import MathImage from '../../../icons/math-image.svg'
import PhysicsImage from '../../../icons/physics-image.svg'
import ChemistryImage from '../../../icons/chemistry-image.svg'

const MyNotes = () => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const subjects = [
    {
      name: 'Mathematics',
      image: MathImage,
      percentage: 10,
    },
    {
      name: 'Physics',
      image: PhysicsImage,
      percentage: 50,
    },
    {
      name: 'Chemistry',
      image: ChemistryImage,
      percentage: 0,
    },
  ];

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName);
    // console.log(`Selected subject: ${subjectName}`);
  };

  return (
    <div className="my-notes-container">
      <h1>My Notes - Select a Subject</h1>
      <div className="subjects-list">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className={`subject-item ${selectedSubject === subject.name ? 'selected' : ''}`}
            onClick={() => handleSubjectClick(subject.name)}
            role="button" // for accessibility
            tabIndex={0} // for accessibility
            onKeyPress={(e) => e.key === 'Enter' && handleSubjectClick(subject.name)} // for accessibility
          >
            <img src={subject.image} alt={subject.name} className="subject-image" />
            <p className="subject-name">{subject.name}</p>
            <p className="subject-percentage">Progress: {subject.percentage}%</p>
          </div>
        ))}
      </div>
      {selectedSubject && (
        <div className="selected-subject-content">
          <h2>Notes for {selectedSubject}</h2>
          <p>Your notes for {selectedSubject} will appear here.</p>
        </div>
      )}
    </div>
  );

};

export default MyNotes;
