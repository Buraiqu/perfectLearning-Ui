import React from 'react';
import './QuestionCard.css';
import BsBookMarkRemove from '../../icons/BsBookMarkRemove.svg';
import warningIcon from '../../icons/BsExclamationTriangle.svg';
import solutionIcon from '../../icons/mcq_solution.svg';
import videoIcon from '../../icons/mcq_concept_video.svg';
const QuestionCard = ({ 
  question, 
  showSolution = false, 
  showConceptVideo = false,
  onShowSolution,
  onShowConceptVideo,
  onReportIssue 
}) => {
  const { id, text, tag, options = [], correctAnswer, userAnswer } = question;

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-id">{id}</span>
        <div className="question-icons">
          <img src={BsBookMarkRemove} alt="Bookmark" className="question-icon" />
          <img src={warningIcon} alt="Warning" className="question-icon" onClick={() => onReportIssue(id)} />
        </div>
      </div>

      <div className="question-content">
        <p className="question-text">{text}</p>
        {tag && <span className="question-tag">{tag}</span>}
      </div>

      <div className="question-options">
        {options.map((option) => (
          <div 
            key={option.id} 
            className={`question-option ${showSolution && option.isCorrect ? 'option-correct' : ''}`}
          >
            <input 
              type="radio" 
              name={`question-${id}`} 
              id={`option-${id}-${option.id}`}
              className="option-radios"
              defaultChecked={showSolution && option.isCorrect}
            />
            <label htmlFor={`option-${id}-${option.id}`} className="option-label">
              <span className="option-letter">({option.id})</span>
              <span className="option-text">{option.text}</span>
            </label>
            {showSolution && option.isCorrect && (
              <span className="correct-indicator">Correct Answer</span>
            )}
          </div>
        ))}
      </div>

      <div className="question-actions">
        {onShowSolution && (
          <button className="qc-action-button qc-solution-btn" onClick={() => onShowSolution(question)}>
            <img src={solutionIcon} alt="Solution" className="action-icon" />
            Show Solution
          </button>
        )}
        {onShowConceptVideo && (
          <button className="qc-action-button qc-video-btn" onClick={() => onShowConceptVideo(question)}>
            <img src={videoIcon} alt="Video" className="action-icon" />
            Concept Video
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
