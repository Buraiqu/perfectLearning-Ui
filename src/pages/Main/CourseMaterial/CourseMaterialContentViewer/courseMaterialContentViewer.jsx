import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import downArrowIcon from '../../../../icons/down-arrow-icon.svg';
import './courseMaterialContentViewer.css'
import BsBookMark from '../../../../icons/BsBookMarks.svg'
import BsSaveBlueIcon from '../../../../icons/BsSaveBlueIcon.svg'
import BsBookMarkRemove from '../../../../icons/BsBookMarkRemove.svg'
import BsBookMarkBlue from '../../../../icons/BsBookMarkBlue.svg'
import BsExclamationTriangle from '../../../../icons/BsExclamationTriangle.svg'
import video from './img3_video5432.mp4'
import TopicsSideBardLoader from '../../../../components/TopicsSideBardLoader/topicsSideBarLoader'
import VideoViewer from '../../../../components/VideoViewer/videoViewer';
import PDFViewer from '../../../../components/PDFViewer/pdfViewer';
import McqViewer from '../../../../components/McqViewer/mcqViewer';

const CourseMaterialContentViewer = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [breadcrumb, setBreadcrumb] = useState([])
    const [bookMark, setBookMark] = useState(false)
    const [notesOpen, setNotesOpen] = useState(false)
    const [notes, setNotes] = useState([
        {
            id: 1,
            text: 'Very important to remember the shortcut for solving super set problem',
            date: '15th May 2023'
        }
    ])
    const [newNote, setNewNote] = useState('')
    const noteInputRef = useRef(null)
    
    const toggleNotes = () => {
        setNotesOpen(!notesOpen)
    }
    
    const handleAddNote = () => {
        if (newNote.trim()) {
            const date = new Date()
            const formattedDate = `${date.getDate()}${getOrdinalSuffix(date.getDate())} ${getMonthName(date.getMonth())} ${date.getFullYear()}`
            
            const newNoteItem = {
                id: Date.now(),
                text: newNote,
                date: formattedDate
            }
            
            setNotes([...notes, newNoteItem])
            setNewNote('')
        }
    }
    
    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id))
    }
    
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }
    
    const getMonthName = (month) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
        return months[month]
    }
    
    const topics = [
        {
            name: 'Types of sets',
            items: [
                { id: 1 ,name: 'Introduction to sets', type: 'video', duration: '5 Mins', status: 'completed' },
                { id: 2 , name: 'Subsets', type: 'video', duration: '5 Mins', status: 'started' },
                { id: 3 , name: 'Subsets', type: 'pdf', duration: '10 Mins Read' },
                { id: 4 , name: 'Union of sets', type: 'video', duration: '15 Mins Video' },
                { id: 5 , name: 'Finite and infinite sets', type: 'video', duration: '20 Mins Video' },
                { id: 6 , name: 'Type of sets', type: 'pptx', duration: '10 Practice Questions' }
            ]
        },
        {
            name: 'Powersets & Applications',
            items: [
                { id: 7 , name: 'Sets Summary', type: 'video', duration: '5 Mins', status: 'completed' },
                { id: 8 , name: 'Sets Summary Part 2', type: 'video', duration: '5 Mins', status: 'started' }
            ]
        }
    ]

    const [selectedContent, setSelectedContent] = useState(topics[0].items[0])
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
    const [currentItemIndex, setCurrentItemIndex] = useState(0)

    const navigateContent = (direction) => {
        let newTopicIndex = currentTopicIndex
        let newItemIndex = currentItemIndex

        if (direction === 'next') {
            // If there are more items in current topic
            if (newItemIndex < topics[currentTopicIndex].items.length - 1) {
                newItemIndex++
            } 
            // If there are more topics
            else if (newTopicIndex < topics.length - 1) {
                newTopicIndex++
                newItemIndex = 0
            }
        } else if (direction === 'prev') {
            // If we can go back in current topic
            if (newItemIndex > 0) {
                newItemIndex--
            }
            // If we can go to previous topic
            else if (newTopicIndex > 0) {
                newTopicIndex--
                newItemIndex = topics[newTopicIndex].items.length - 1
            }
        }

        // Update state if navigation is possible
        if (newTopicIndex !== currentTopicIndex || newItemIndex !== currentItemIndex) {
            setCurrentTopicIndex(newTopicIndex)
            setCurrentItemIndex(newItemIndex)
            setSelectedContent(topics[newTopicIndex].items[newItemIndex])
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const subject = params.get('subject')
        const topic = params.get('topic')
        const subtopic = params.get('subtopic')

        const newBreadcrumb = []
        if (subject) {
            newBreadcrumb.push({ name: subject, path: `/main/course-material?subject=${subject}` })
        }
        if (topic) {
            newBreadcrumb.push({ name: topic, path: `/main/course-material-topics?subject=${subject}&topic=${topic}` })
        }
        if (subtopic) {
            newBreadcrumb.push({ name: subtopic, path: `/main/course-material-topics?subject=${subject}&topic=${topic}&subtopic=${subtopic}` })
        }
        setBreadcrumb(newBreadcrumb)
        document.documentElement.style.setProperty('--value-percent', '1%')
    }, [location])

    return (
        <div className="content-viewer-section">
            {/* Notes Sidebar */}
            {/* Removed overlay as per request */}
            <div className={`notes-sidebar ${notesOpen ? 'open' : ''}`}>
                <div className="notes-content-container">
                    <div className="notes-header">
                        <h2>Notes</h2>
                        <button className="close-notes" onClick={toggleNotes}>
                            ×
                        </button>
                    </div>
                    <div className="notes-content">
                        {notes.map(note => (
                            <div key={note.id} className="note-item">
                                <div className="note-content">
                                    <p className="note-text">{note.text}</p>
                                    <p className="note-date">{note.date}</p>
                                    <div className="note-actions">
                                        <button className="edit-note">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.5 6.5L9.5 3.5L2 11V14H5L12.5 6.5Z" stroke="#03488B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button className="delete-note" onClick={() => handleDeleteNote(note.id)}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 4H3.33333H14" stroke="#03488B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5.33334 4V2.66667C5.33334 2.31305 5.47382 1.97391 5.72387 1.72386C5.97392 1.47381 6.31305 1.33334 6.66668 1.33334H9.33334C9.68697 1.33334 10.0261 1.47381 10.2762 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2762 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66668C4.31305 14.6667 3.97392 14.5262 3.72387 14.2761C3.47382 14.0261 3.33334 13.687 3.33334 13.3333V4H12.6667Z" stroke="#03488B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-note-container">
                        <input 
                            type="text" 
                            placeholder="Add Note" 
                            className="add-note-input" 
                            value={newNote} 
                            onChange={(e) => setNewNote(e.target.value)}
                            ref={noteInputRef}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                        />
                        <button className="add-note-button" onClick={handleAddNote}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-viewer">
                <div className="content-viewer-header">
                    <div className="content-viewer-breadcrumb">
                        {breadcrumb.map((item, index) => (
                            <span key={index}>
                                {index > 0 && <span className="breadcrumb-separator"> &gt; </span>}
                                <span 
                                    className={`breadcrumb-item ${index == (breadcrumb.length - 1) ? 'last-item' : ''}`}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.name}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="content-viewer-body">
                    <div className="content-viewer-container">
                        <div className="content-controls">
                            {selectedContent && selectedContent.type !== 'pptx' ? (
                                <button className="take-notes-button" onClick={toggleNotes}>
                                    Take Notes
                                </button>
                            ):(
                                <div></div>
                            )}
                            <div className="navigation-controls">
                                <button 
                                    className="nav-button prev" 
                                    onClick={() => navigateContent('prev')}
                                    disabled={currentTopicIndex === 0 && currentItemIndex === 0}
                                >
                                    <img src={downArrowIcon} alt="" />
                                    Previous
                                </button>
                                <button 
                                    className="nav-button next"
                                    onClick={() => navigateContent('next')}
                                    disabled={currentTopicIndex === topics.length - 1 && currentItemIndex === topics[currentTopicIndex].items.length - 1}
                                >
                                    Next
                                    <img src={downArrowIcon} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="content-section">
                            {selectedContent && selectedContent.type === 'video' ? (
                                <VideoViewer src={video}/>
                            ) : selectedContent.type === 'pdf' ? (
                                <PDFViewer/>
                            ) : selectedContent.type === 'pptx' ? (
                                <McqViewer/>
                            ) : null}
                        </div>
                        {selectedContent && selectedContent.type !== 'pptx' ? (
                            <>
                                <div className="content-actions">
                                    <div className="bookmark-container">
                                        <button 
                                            className="content-action-button" 
                                            onClick={() => {
                                                setBookMark(!bookMark);
                                            }}>
                                            <img src={!bookMark ? BsBookMark : BsBookMarkRemove} alt="Bookmark" />
                                            Bookmark video
                                        </button>
                                        {bookMark && (
                                            <div className="bookmark-tooltip">
                                                <div className="tooltip-content">
                                                    <h3>Added to Bookmarks</h3>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button className="content-action-button">
                                        <img src={BsSaveBlueIcon} alt="Save" />
                                        Save Offline
                                    </button>
                                </div>
                                <div className="formula-sheet">
                                    <h2>Formula Sheet</h2>
                                    <div className="formula-list">
                                        {[1, 2, 3].map((num) => (
                                            <div key={num} className="formula-item">
                                                <div className="formula-content">
                                                    <span className="formula-title">Formula {num}</span>
                                                    <div className="formula-actions">
                                                        <button className="action-button">
                                                            <img src={BsBookMarkBlue} alt="Bookmark" />
                                                            Bookmark
                                                        </button>
                                                        <button className="action-button outline">
                                                            <img src={BsExclamationTriangle} alt="Report" />
                                                            Report
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <TopicsSideBardLoader
                selectedTopic={currentTopicIndex}
                selectedItem={currentItemIndex}
                topics={topics} 
                onSelectItem={(item, topicIndex, itemIndex) => {
                    setSelectedContent(item);
                    setCurrentTopicIndex(topicIndex);
                    setCurrentItemIndex(itemIndex);
                }}
            />
        </div>
    )
}

export default CourseMaterialContentViewer