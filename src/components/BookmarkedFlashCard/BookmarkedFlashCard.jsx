import React from 'react';
import './BookmarkedFlashCard.css';
import warningIcon from '../../icons/BsExclamationTriangle.svg';
import BsBookMarkRemove from '../../icons/BsBookMarkRemove.svg';

const BookmarkedFlashCard = ({ 
  flashcard,
  onRemoveBookmark,
  onReportIssue 
}) => {
  const { id, content, formula } = flashcard;

  return (
    <div className="bookmarked-flashcard">
      <div className="flashcard-icons">
        <button 
          className="flashcard-icon-btn warning-btn" 
          onClick={() => onReportIssue && onReportIssue(flashcard)}
          title="Report Issue"
        >
          <img src={warningIcon} alt="Warning" />
        </button>
        <button 
          className="flashcard-icon-btn bookmark-btn" 
          onClick={() => onRemoveBookmark && onRemoveBookmark(flashcard)}
          title="Remove Bookmark"
        >
          <img src={BsBookMarkRemove} alt="Bookmark" />
        </button>
      </div>
      
      <div className="flashcard-content">
        <p className="flashcard-text">{content}</p>
        
        {formula && (
          <div className="flashcard-formula">
            <span className="formula-text">{formula}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedFlashCard;
