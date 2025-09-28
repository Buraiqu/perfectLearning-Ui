import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BookmarkedQuestions.css';

// Import components
import StudySidebar from '../../../components/StudySidebar/StudySidebar';
import QuestionCard from '../../../components/QuestionCard/QuestionCard';
import Pagination from '../../../components/Pagination/Pagination';
import BookmarkedFlashCard from '../../../components/BookmarkedFlashCard/BookmarkedFlashCard';
import BookmarkedVideoPlayer from '../../../components/BookmarkedVideoPlayer/BookmarkedVideoPlayer';
import tickSquareIcon from '../../../icons/tick-square-icon.svg';
import BookmarkedNote from '../../../components/BookmarkedNote/BookmarkedNote';
import PDFViewer from '../../../components/PDFViewer/pdfViewer';
import { FiBookmark } from 'react-icons/fi';
import { mockNotes, mockBookmarkedNote } from './mock-data';
import ReportQuestionModal from '../../../components/Modals/ReportQuestion-Modal/reportQuestionModal';

const BookmarkedQuestions = () => {
  const { subject, topic } = useParams();
  const navigate = useNavigate();
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [activeTab, setActiveTab] = useState('questions');
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [bookmarkedNoteData, setBookmarkedNoteData] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const questionsPerPage = 1;

  // Mock data for questions - replace with API call
  const mockQuestions = [
    {
      id: 'Q1',
      text: 'A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be',
      tag: 'Types of Sets',
      options: [
        { id: 'A', text: '375', isCorrect: false },
        { id: 'B', text: '75', isCorrect: true },
        { id: 'C', text: '50', isCorrect: false },
        { id: 'D', text: '525', isCorrect: false },
      ],
      correctAnswer: 'B',
      userAnswer: null
    },
    {
      id: 'Q2',
      text: 'What is the derivative of x² + 3x + 2?',
      tag: 'Calculus',
      options: [
        { id: 'A', text: '2x + 3', isCorrect: true },
        { id: 'B', text: 'x + 3', isCorrect: false },
        { id: 'C', text: '2x + 2', isCorrect: false },
        { id: 'D', text: 'x² + 3', isCorrect: false },
      ],
      correctAnswer: 'A',
      userAnswer: null
    },
    {
      id: 'Q3',
      text: 'Find the integral of 2x dx',
      tag: 'Integration',
      options: [
        { id: 'A', text: 'x² + C', isCorrect: true },
        { id: 'B', text: '2x² + C', isCorrect: false },
        { id: 'C', text: 'x + C', isCorrect: false },
        { id: 'D', text: '2x + C', isCorrect: false },
      ],
      correctAnswer: 'A',
      userAnswer: null
    },
    {
      id: 'Q4',
      text: 'What is the value of sin(90°)?',
      tag: 'Trigonometry',
      options: [
        { id: 'A', text: '0', isCorrect: false },
        { id: 'B', text: '1', isCorrect: true },
        { id: 'C', text: '-1', isCorrect: false },
        { id: 'D', text: '1/2', isCorrect: false },
      ],
      correctAnswer: 'B',
      userAnswer: null
    },
    {
      id: 'Q5',
      text: 'Solve for x: 2x + 5 = 15',
      tag: 'Algebra',
      options: [
        { id: 'A', text: '5', isCorrect: true },
        { id: 'B', text: '10', isCorrect: false },
        { id: 'C', text: '7.5', isCorrect: false },
        { id: 'D', text: '3', isCorrect: false },
      ],
      correctAnswer: 'A',
      userAnswer: null
    },
    {
      id: 'Q6',
      text: 'What is the area of a circle with radius 3?',
      tag: 'Geometry',
      options: [
        { id: 'A', text: '6π', isCorrect: false },
        { id: 'B', text: '9π', isCorrect: true },
        { id: 'C', text: '3π', isCorrect: false },
        { id: 'D', text: '12π', isCorrect: false },
      ],
      correctAnswer: 'B',
      userAnswer: null
    },
    {
      id: 'Q7',
      text: 'Find the limit of (x² - 1)/(x - 1) as x approaches 1',
      tag: 'Limits',
      options: [
        { id: 'A', text: '1', isCorrect: false },
        { id: 'B', text: '2', isCorrect: true },
        { id: 'C', text: '0', isCorrect: false },
        { id: 'D', text: 'undefined', isCorrect: false },
      ],
      correctAnswer: 'B',
      userAnswer: null
    }
  ];

  // Mock data for flashcards - replace with API call
  const mockFlashcards = [
    {
      id: 'F1',
      content: 'The atomic weight of an element is defined as the average relative weight (or mass) of an atom of an element with respect to (1/12)th of an atom of carbon.',
      formula: 'Weight of an atom of the element / Weight of an atom of C (mass no. 12) × 12'
    },
    {
      content: 'The mole is defined as the amount of substance containing as many elementary entities as there are atoms in 0.012 kg of carbon-12.',
      formula: '1 mole = 6.022 × 10²³ particles'
    },
    {
      id: 'F3',
      content: 'Avogadro\'s number represents the number of atoms in exactly 12 grams of carbon-12 isotope.',
      formula: 'NA = 6.022 × 10²³ mol⁻¹'
    }
  ];

  const mockVideos = [
    {
      id: 'V1',
      title: 'Types of Sets',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'V2',
      title: 'Introduction to Calculus',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ];
  useEffect(() => {
    const newBreadcrumb = [];
    if (subject) {
      newBreadcrumb.push({ name: subject, path: `/main/my-notes?subject=${subject}` });
    }
    if (topic) {
      newBreadcrumb.push({ name: topic, path: `/main/bookmarked-questions/${subject}/${topic}` });
    }
    setBreadcrumb(newBreadcrumb);
  }, [subject, topic]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setQuestionsData(mockQuestions);
      setFlashcardsData(mockFlashcards);
      setVideosData(mockVideos);
      setNotesData(mockNotes);
      setBookmarkedNoteData(mockBookmarkedNote);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const totalPages = Math.ceil((activeTab === 'flashcards' ? flashcardsData.length : activeTab === 'videos' ? videosData.length : questionsData.length) / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questionsData.slice(startIndex, startIndex + questionsPerPage);
  const currentFlashcards = flashcardsData.slice(startIndex, startIndex + questionsPerPage);
  const currentVideos = videosData.slice(startIndex, startIndex + questionsPerPage);
  const currentNotes = notesData.slice(startIndex, startIndex + questionsPerPage);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    console.log('Changing to page:', page);
    setCurrentPage(page);
  };

  const handleShowSolution = (question) => {
    console.log('Show solution for:', question.id);
    // Implement solution modal or navigation
  };

  const handleRemoveBookmark = (flashcard) => {
    console.log('Remove bookmark for flashcard:', flashcard.id);
    // Implement remove bookmark logic here
  };

  const handleReportIssue = (flashcard) => {
    setSelectedQuestionId(flashcard.id);
    setShowReportModal(true);
  };

  const handleEditNote = (note) => {
    console.log('Editing note:', note.id);
    // Implement edit logic, e.g., open a modal with the note content
  };

  const handleRemoveNote = (noteId) => {
    setNotesData(notesData.filter((note) => note.id !== noteId));
    console.log('Removing note:', noteId);
  };

  const handleAddNote = () => {
    if (newNote.trim() === '') return;

    const newNoteObject = {
      id: `N${notesData.length + 1}`,
      topic: 'Subsets', // Default or derive from context
      text: newNote,
      date: new Date().toISOString(),
    };

    setNotesData([...notesData, newNoteObject]);
    setNewNote('');
    console.log('Adding new note:', newNoteObject);
  };

  const handleShowConceptVideo = (question) => {
    console.log('Show concept video for:', question.id);
    // Implement video modal or navigation
  };

  const handleReportQuestion = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowReportModal(true);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading content...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'questions':
        return currentQuestions.length > 0 ? (
          currentQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              showSolution={true}
              onShowSolution={handleShowSolution}
              onShowConceptVideo={handleShowConceptVideo}
              onReportIssue={() => handleReportQuestion(question.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No bookmarked questions found.</p>
          </div>
        );
      case 'videos':
        return currentVideos.length > 0 ? (
          currentVideos.map((video) => (
            <BookmarkedVideoPlayer key={video.id} video={video} />
          ))
        ) : (
          <div className="empty-state">
            <p>No bookmarked videos found.</p>
          </div>
        );
      case 'flashcards':
        return currentFlashcards.length > 0 ? (
          currentFlashcards.map((flashcard) => (
            <BookmarkedFlashCard
              key={flashcard.id}
              flashcard={flashcard}
              onRemoveBookmark={handleRemoveBookmark}
              onReportIssue={handleReportIssue}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>No bookmarked flashcards found.</p>
          </div>
        );
      case 'notes':
        const groupedNotes = notesData.reduce((acc, note) => {
          const { topic } = note;
          if (!acc[topic]) {
            acc[topic] = [];
          }
          acc[topic].push(note);
          return acc;
        }, {});

        return (
          <div className="bookmarked-notes-container">
            {notesData.length > 0 ? (
              Object.entries(groupedNotes).map(([topic, notes]) => (
                <div key={topic} className="note-topic-group">
                  <h3 className="note-topic-title">{topic}</h3>
                  {notes.map((note) => (
                    <BookmarkedNote
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onRemove={handleRemoveNote}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No bookmarked notes found.</p>
              </div>
            )}
            <div className="add-note-container">
              <input
                type="text"
                className="add-note-input"
                placeholder="Add Note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <button className="add-note-button" onClick={handleAddNote}>
                <img src={tickSquareIcon} alt="" />
              </button>
            </div>
          </div>
        );
      case 'bookmarked-notes':
        return bookmarkedNoteData ? (
          <div className="bookmarked-pdf-view-container">
            <h2 className="bookmarked-pdf-topic-title">{bookmarkedNoteData.topic}</h2>
            <div className="bookmarked-pdf-content-card">
              <PDFViewer pdfUrl={bookmarkedNoteData.pdfUrl} />
            </div>
            <div className="bookmarked-pdf-actions">
              <button 
                className="remove-bookmark-btn" 
                onClick={() => console.log('Remove bookmark for', bookmarkedNoteData.id)}
              >
                <FiBookmark className="remove-bookmark-icon" />
                Remove Bookmark
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>No bookmarked note found.</p>
          </div>
        );
      case 'formula':
        return bookmarkedNoteData ? (
          <div className="bookmarked-pdf-view-container">
            <h2 className="bookmarked-pdf-topic-title">{bookmarkedNoteData.topic}</h2>
            <div className="bookmarked-pdf-content-card">
              <PDFViewer pdfUrl={bookmarkedNoteData.pdfUrl} />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>No bookmarked formula sheet found.</p>
          </div>
        );
      default:
        return (
          <div className="empty-state">
            <p>No content available for this section.</p>
          </div>
        );
    }
  };


  return (
    <div className="bookmarked-questions-container">
      {showReportModal && (
        <ReportQuestionModal 
          show={showReportModal}
          handleClose={() => setShowReportModal(false)}
          questionId={selectedQuestionId}
        />
      )}
      <div className="bookmarked-questions-header">
        <div className="content-viewer-breadcrumb">
          {breadcrumb.map((item, index) => (
            <span key={index}>
              {index > 0 && <span className="breadcrumb-separator"> &gt; </span>}
              <span 
                className={`breadcrumb-item ${index === (breadcrumb.length - 1) ? 'last-item' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="bookmarked-questions-content">
        <StudySidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="questions-main-content">
          <div className="content-header">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <div className={`questions-list ${activeTab === 'flashcards' ? 'flashcards-center' : ''}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkedQuestions;
