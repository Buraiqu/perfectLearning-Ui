import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import verticalThreeDot from '../../../../icons/verticalThreeDot-icon.svg'
import downArrowIcon from '../../../../icons/down-arrow-icon.svg';
import circleGreenTick from  '../../../../icons/BsCheckCircleFill.svg'
import bsCameraVideoIcon from '../../../../icons/BsCameraVideoBlack.svg';
import BsFileEaMarkText from '../../../../icons/BsFileEarMarkText.svg'
import BsFilePpt from '../../../../icons/BsFilePpt.svg'
import BsGeo from '../../../../icons/BsGeo.svg'
import BsGeoAlt from '../../../../icons/BsGeoAlt.svg'
import './courseMaterialTopics.css'

const CourseMaterialTopics = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [breadcrumb, setBreadcrumb] = useState([])
    const [expandedSection, setExpandedSection] = useState(0)
    const [expandedSubSection, setExpandedSubSection] = useState('Types of sets')
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.threedot-container')) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showDropdown])

    const topics = [
        {
            name: 'Sets',
            expanded: true,
            subSections: [
                {
                    name: 'Types of sets',
                    expanded: true,
                    items: [
                        { name: 'Introduction to sets', type: 'video', duration: '5 Mins', status: 'completed' },
                        { name: 'Subsets', type: 'video', duration: '5 Mins' , status: 'started'},
                        { name: 'Subsets', type: 'read', duration: '10 Mins Read' },
                        { name: 'Union of sets', type: 'video', duration: '15 Mins Video' },
                        { name: 'Finite and infinite sets', type: 'video', duration: '20 Mins Video' },
                        { name: 'Types of sets', type: 'practice', duration: '10 Practice Questions' }
                    ]
                }
            ]
        },
        {
            name: 'Relations',
            expanded: false,
            subSections: []
        },
        {
            name: 'Functions',
            expanded: false,
            subSections: []
        }
    ]

    useEffect(() => {
        // Parse URL parameters
        const params = new URLSearchParams(location.search)
        const subject = params.get('subject')
        const topic = params.get('topic')

        // Build breadcrumb
        const newBreadcrumb = []
        if (subject) {
            newBreadcrumb.push({ name: subject, path: `/main/course-material?subject=${subject}` })
        }
        if (topic) {
            newBreadcrumb.push({ name: topic, path: `/main/course-material-topics?subject=${subject}&topic=${topic}` })
        }
        setBreadcrumb(newBreadcrumb)
    }, [location])

    const handleSubTopicClick = (item) => {
        const params = new URLSearchParams(location.search)
        params.set('subtopic', item.name)
        navigate(`/main/course-material-content-viewer?${params.toString()}`)
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return bsCameraVideoIcon
            case 'read':
                return BsFileEaMarkText
            case 'practice':
                return BsFilePpt
            default:
                return BsFileEaMarkText
        }
    }

    return (
        <div className="course-material-topics-section">
            <div className="course-material-topics-header">
                <div className="topics-breadcrumb">
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

            <div className="topics-container">
                {topics.map((topic, index) => (
                    <div key={index} className="topic-section">
                        <div 
                            className={`topic-header ${index === expandedSection ? 'expanded' : ''}`}
                            onClick={() => setExpandedSection(index === expandedSection ? '' : index)}
                        >
                            <div className="left-section">
                                <img 
                                    src={downArrowIcon} 
                                    className={`dropdown-arrow ${index === expandedSection ? 'rotated' : ''}`}
                                    alt="" 
                                />
                                <span className="topic-name">{topic.name}</span>
                            </div>
                            {index === expandedSection  && topic.subSections.length? (
                                <div className="progress-summary">
                                    <div className="time-left">
                                        <img src={bsCameraVideoIcon} alt="" />
                                        <span className="time">2h 15Mins</span>
                                        <span className="label">Videos left</span>
                                    </div>
                                    <div className="time-left">
                                        <img src={BsFileEaMarkText} style={{width: '19px'}} alt="" />
                                        <span className="time">40Mins</span>
                                        <span className="label">Reading left</span>
                                    </div>
                                    <div className="time-left">
                                        <img src={BsFilePpt} style={{width: '19px'}} alt="" />
                                        <span className="time">50</span>
                                        <span className="label">Practice Questions left</span>
                                    </div>
                                    <div className="threedot-container">
                                        <img 
                                            className="vertical-threedot" 
                                            src={verticalThreeDot} 
                                            alt="" 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedTopic(topic)
                                                setShowDropdown(!showDropdown)
                                            }}
                                        />
                                        {showDropdown && selectedTopic?.name === topic.name && (
                                            <div className="topic-info-dropdown">
                                                <div className="topic-info-item">
                                                    <img src={BsGeoAlt} className="topic-info-icon" alt="" />
                                                    <div className="topic-info-text">
                                                        <span className="info-label">Start Date :</span>
                                                        <span className="info-value">12 Aug 2023</span>
                                                    </div>
                                                </div>
                                                <div className="topic-info-item">
                                                    <img src={BsGeo} className="topic-info-icon" alt="" />
                                                    <div className="topic-info-text">
                                                        <span className="info-label">End Date :</span>
                                                        <span className="info-value">In Progress</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ):(null)}
                        </div>
                        {index === expandedSection && topic.subSections.length ? (
                            <div className="course-topics-progress-bar-section">
                                <div className="course-topics-progress-bar">
                                    <div className="course-topics-progress"></div>
                                </div>
                            </div>
                        ):null}
                        {index === expandedSection && (
                            <div className="subsections">
                                {topic.subSections.map((subSection, subIndex) => (
                                    <div key={subIndex} className="subsection">
                                        <div 
                                            className={`subsection-header ${subSection.name === expandedSubSection ? 'expanded' : ''}`}
                                            onClick={() => setExpandedSubSection(subSection.name === expandedSubSection ? '' : subSection.name)}
                                        >
                                            <img 
                                                src={downArrowIcon} 
                                                className={`dropdown-arrow ${subSection.name === expandedSubSection ? 'rotated' : ''}`}
                                                alt="" 
                                            />
                                            <span className="subsection-name">{subSection.name}</span>
                                        </div>
                                        {subSection.name === expandedSubSection && (
                                            <div className="items-list">
                                                {subSection.items.map((item, itemIndex) => (
                                                    <div 
                                                        key={itemIndex} 
                                                        className={`topic-item ${item.status === 'completed' ? 'completed' : ''}`}
                                                        onClick={() => handleSubTopicClick(item)}
                                                    >
                                                        {item.status === 'completed' ? (
                                                            <img className='type-icon' src={circleGreenTick} alt="" />
                                                        ):(
                                                            <img className="type-icon" src={getTypeIcon(item.type)} alt="" />
                                                        )}
                                                        <div className="item-content">
                                                            <span className="item-name">{item.name}</span>
                                                            <span className="item-duration">{item.duration}</span>
                                                        </div>
                                                        {item.status === 'started' && (
                                                            <button 
                                                                className='resume-button'
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleSubTopicClick(item)
                                                                }}
                                                            >
                                                                Resume
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseMaterialTopics