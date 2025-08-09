import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookmarkedQuestions.css';

// Import icons
import { FaBookmark } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BsFileText, BsFileEarmarkText } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';
import { BiNote } from 'react-icons/bi';
import { IoIosWarning } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';

const BookmarkedQuestions = () => {
  const { subject, topic } = useParams();
  const [activeTab, setActiveTab] = useState('questions');
  
  // Mock data for questions
  const questions = [
    {
      id: 'Q1',
      text: 'A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be',
      tag: 'Types of Sets',
      options: [
        { id: 'A', text: '375', isCorrect: false },
        { id: 'B', text: '75', isCorrect: true },
        { id: 'C', text: '50', isCorrect: false },
        { id: 'D', text: '525', isCorrect: false },
      ]
    }
  ];
  


  return (
    <div className="bq-container">
      <div className="bq-header">
        <div className="bq-breadcrumb">
          <Link to="/main/my-notes">{subject}</Link> &gt; {topic}
        </div>
      </div>
      
      <div className="bq-main-content">
        <div className="bq-sidebar">
          <div 
            className={`bq-sidebar-item ${activeTab === 'questions' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            <IoDocumentTextOutline className="bq-icon" />
            <span>Bookmarked Questions</span>
          </div>
          <div 
            className={`bq-sidebar-item ${activeTab === 'flashcards' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            <BsFileText className="bq-icon" />
            <span>Bookmarked Flashcards</span>
          </div>
          <div 
            className={`bq-sidebar-item ${activeTab === 'formula' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('formula')}
          >
            <BsFileEarmarkText className="bq-icon" />
            <span>Formula Sheet</span>
          </div>
          <div 
            className={`bq-sidebar-item ${activeTab === 'videos' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <MdOndemandVideo className="bq-icon" />
            <span>Bookmarked Videos</span>
          </div>
          <div 
            className={`bq-sidebar-item ${activeTab === 'notes' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <BiNote className="bq-icon" />
            <span>Course Notes</span>
          </div>
          <div 
            className={`bq-sidebar-item ${activeTab === 'bookmarked-notes' ? 'bq-active' : ''}`}
            onClick={() => setActiveTab('bookmarked-notes')}
          >
            <RiPencilLine className="bq-icon" />
            <span>Bookmarked Notes</span>
          </div>
        </div>
      
        <div className="bq-content">
          <div className="bq-content-header">
            <div className="bq-pagination">
              <button className="bq-page-nav">
                <FiChevronLeft />
              </button>
              <button className="bq-page-btn bq-page-active">1</button>
              <button className="bq-page-btn">2</button>
              <button className="bq-page-btn">3</button>
              <button className="bq-page-btn">4</button>
              <button className="bq-page-btn">5</button>
              <button className="bq-page-nav">
                <FiChevronRight />
              </button>
            </div>
          </div>
          
          {activeTab === 'questions' && (
            <div className="bq-questions">
              <div className="bq-question-header">
                <div className="bq-question-id">Q1</div>
                <div className="bq-actions">
                  <button className="bq-bookmark-btn">
                    <FaBookmark className="bq-bookmark-icon" />
                  </button>
                  <button className="bq-report-btn">
                    <IoIosWarning className="bq-report-icon" />
                  </button>
                </div>
              </div>
              
              <div className="bq-question-text">
                A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively.
                <br />
                Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be
              </div>
              
              <div className="bq-tag">Types of Sets</div>
              
              <div className="bq-divider"></div>
              
              <div className="bq-options">
                <div className="bq-option">
                  <div className="bq-option-radio">
                    <input type="radio" id="option-a" name="question-option" />
                    <label htmlFor="option-a"></label>
                  </div>
                  <div className="bq-option-label">(A)</div>
                  <div className="bq-option-text">375</div>
                </div>
                
                <div className="bq-option bq-correct">
                  <div className="bq-option-radio">
                    <input type="radio" id="option-b" name="question-option" checked />
                    <label htmlFor="option-b"></label>
                  </div>
                  <div className="bq-option-label">(B)</div>
                  <div className="bq-option-text">75</div>
                  <div className="bq-correct-label">Correct Answer</div>
                </div>
                
                <div className="bq-option">
                  <div className="bq-option-radio">
                    <input type="radio" id="option-c" name="question-option" />
                    <label htmlFor="option-c"></label>
                  </div>
                  <div className="bq-option-label">(C)</div>
                  <div className="bq-option-text">50</div>
                </div>
                
                <div className="bq-option">
                  <div className="bq-option-radio">
                    <input type="radio" id="option-d" name="question-option" />
                    <label htmlFor="option-d"></label>
                  </div>
                  <div className="bq-option-label">(D)</div>
                  <div className="bq-option-text">525</div>
                </div>
              </div>
              
              <div className="bq-divider"></div>
              
              <div className="bq-question-footer">
                <button className="bq-solution-btn">
                  <span className="bq-solution-icon">📄</span>
                  Show Solution
                </button>
                <button className="bq-video-btn">
                  <span className="bq-video-icon">▶</span>
                  Concept Video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedQuestions;
