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
import VideoViewer from  '../../../components/VideoViewer/videoViewer'
import PDFViewer from  '../../../components/PDFViewer/pdfViewer'
import video from './movie.mov'
import BSBookMarkIcon from '../../../icons/BsBookmarks.svg'
import BsBlueTriangleExclamation from '../../../icons/BsExclamationTriangle.svg'
import BsBluePatchCheckIcon from '../../../icons/BsBluePatchCheck.svg'

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
                    <input type="radio" id="option-b" name="question-option" defaultChecked/>
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
          {activeTab === 'videos' && (
            <div className="bq-questions">
              <VideoViewer src={video}/>
            </div>
          )}
          {activeTab === 'formula' && (
            <div className="bq-questions">
              <PDFViewer/>
            </div>
          )}
          {activeTab === 'bookmarked-notes' && (
            <div className="bq-questions">
              <PDFViewer/>
            </div>
          )}
          {activeTab === 'bookmarked-notes' && (
            <div className="bq-questions">
              <div className="bookmarked-notes-container">
                <div className="notes-header">
                  <h3>Bookmarked Questions</h3>
                  <div className="notes-count">
                    <span className="count-number">1</span>
                    <span className="count-label">Questions</span>
                  </div>
                </div>
                
                <div className="note-group">
                  <div className="group-header">
                    <span className="group-title">Group 1</span>
                    <div className="group-actions">
                      <button className="action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button className="action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                      <button className="action-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="note-item">
                    <div className="note-content">
                      <div className="note-text">
                        <span className="note-title">Question 1</span>
                        <p className="note-description">A sample Q has half life 20min. It decays by emitting alpha particle and beta particle with probability of 60% and 40% respectively. Initial sample of Q contains 1000 nuclei, then number of α-particle decay after one hour will be</p>
                        <div className="note-tag">Types of Sets</div>
                      </div>
                      <div className="note-actions">
                        <button className="action-btn">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <button className="action-btn">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                        <button className="action-btn">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 5.5V8.5" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 11.5H8.01" stroke="#64748B" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="add-note">
                  <div className="add-note-input">
                    <input type="text" placeholder="Add a note to this question" />
                    <button className="add-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.5V12.5" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.5 8H12.5" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'flashcards' && (
            <div className="bq-questions" style={{background: 'none'}}>
              <div className="flash-card-main">
                  <div className="flash-card-container">
                      <div className="flash-card">
                          <button className="icon-button warning-icon" onClick={() => setReportModal(true)}>
                              <img src={BsBlueTriangleExclamation} alt="" />
                          </button>
                          <button className="icon-button bookmark-icon">
                              <img src={BSBookMarkIcon} alt="" />
                          </button>
                          <button className="icon-button check-icon">
                              <img src={BsBluePatchCheckIcon} alt="" />
                          </button>

                          <div className='flash-content'>
                              <p>The atomic weight of an element is defined as the average relative weight (or mass) of an atom of an element with respect to (1/12)th of an atom of carbon.</p>
                          </div>

                          <div className='flash-content'>
                              <div className="flash-card-formula">
                                  <img src="data:image/png;base64," alt="Weight formula" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedQuestions;
