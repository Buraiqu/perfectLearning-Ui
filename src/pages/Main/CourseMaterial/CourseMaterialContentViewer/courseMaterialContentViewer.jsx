import { useEffect, useState } from 'react'
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
                            <button className="take-notes-button">
                                Take Notes
                            </button>
                            <div className="navigation-controls">
                                <button className="nav-button prev">
                                    <img src={downArrowIcon} alt="" />
                                    Previous
                                </button>
                                <button className="nav-button next">
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
                    </div>
                </div>
            </div>
            <TopicsSideBardLoader 
                topics={topics} 
                onSelectItem={(item) => setSelectedContent(item)}
            />
        </div>
    )
}

export default CourseMaterialContentViewer