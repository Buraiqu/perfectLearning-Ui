import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './BookmarkedNote.css';

const BookmarkedNote = ({ note, onEdit, onRemove }) => {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="bookmarked-note-card">
      <div className="bookmarked-note-content">
        <p className="bookmarked-note-text">{note.text}</p>
        <span className="bookmarked-note-date">{formatDate(note.date)}</span>
      </div>
      <div className="bookmarked-note-actions">
        <button onClick={() => onEdit(note)} className="bookmarked-note-action-btn">
          <FiEdit />
        </button>
        <button onClick={() => onRemove(note.id)} className="bookmarked-note-action-btn">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default BookmarkedNote;
