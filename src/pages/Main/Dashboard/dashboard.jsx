import './dashboard.css';
import ReactApexChart from 'react-apexcharts';
import { useState, useRef, useEffect } from 'react';

const chartOptions = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Mathematics', 'Physics'],
    },
    yaxis: {
        title: {
            text: '%'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "%"
            }
        }
    }
};

const chartSeries = [{
    name: 'Accuracy',
    data: [86, 78]
}];

const pieChartOptions = {
    chart: {
        type: 'donut',
        height: 220,
        offsetY: 0
    },
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 0,
            donut: {
                size: '80%',
                labels: {
                    show: false
                }
            }
        }
    },
    colors: ['#4caf50', '#2196f3', '#f44336'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    tooltip: {
        enabled: false
    },
    stroke: {
        width: 0
    }
};

const pieChartSeries = [255, 75, 135]; // Minutes for each subject

const Dashboard = () => {
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [subjectValue, setSubjectValue] = useState('Mathematics');
    const [topicValue, setTopicValue] = useState('Sets, Relations & Functions');
    const [deadlineValue, setDeadlineValue] = useState('Tomorrow');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    
    const dateDropdownRef = useRef(null);
    const calendarRef = useRef(null);

    const openGoalModal = () => {
        setShowGoalModal(true);
    };

    const closeGoalModal = () => {
        setShowGoalModal(false);
        setShowDateDropdown(false);
        setShowCalendar(false);
    };

    const handleSetGoal = () => {
        // Logic to add a new goal would go here
        // For now, just close the modal
        closeGoalModal();
    };

    const toggleDateDropdown = () => {
        setShowDateDropdown(!showDateDropdown);
        setShowCalendar(false);
    };

    const handleDateSelection = (value) => {
        setDeadlineValue(value);
        if (value === 'Pick date') {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        }
        setShowDateDropdown(false);
    };

    // Calendar navigation functions
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        setDeadlineValue(formattedDate);
        setShowCalendar(false);
    };

    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Adjust Sunday to be 7 instead of 0
        
        // Create array for all days in month
        const days = [];
        
        // Add empty cells for days before first day of month
        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push({ date: null });
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({ date, day: i });
        }
        
        return days;
    };

    // Close dropdown and calendar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setShowDateDropdown(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target) && 
                dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dateDropdownRef, calendarRef]);

    // Calculate day names
    const getTodayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    const getTomorrowName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return days[tomorrow.getDay()];
    };

    const getNextMondayName = () => {
        return 'Monday';
    };

    return (
        <div className="dashboard-container">
            {/* Exam Progress Card */}
            <div className="exam-progress-card">
                <div className="exam-info">
                    <div className="exam-icon">
                        <img src="/icons/engineering.svg" alt="Engineering icon" />
                    </div>
                    <div className="exam-details">
                        <h2>Engineering Entrance Exams</h2>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '0%' }}></div>
                        </div>
                        <p>Overall Progress</p>
                    </div>
                </div>
            </div>

            {/* Exam Countdown Card */}
            <div className="exam-countdown-card">
                <div className="exam-logo">
                    <img src="/icons/iit.svg" alt="IIT logo" />
                </div>
                <div className="exam-countdown-info">
                    <h2>IIT JEE 2024</h2>
                    <p>in June 2024</p>
                </div>
                <div className="countdown">
                    <h1>50</h1>
                    <p>Weeks to go</p>
                </div>
            </div>

            {/* Study Section */}
            <div className="study-section">
                <h2>Pickup where you left off</h2>
                <div className="study-card">
                    <div className="study-image">
                        <img src="/images/math-notes.jpg" alt="Math notes" />
                    </div>
                    <div className="study-content">
                        <h3>Types of sets</h3>
                        <p>in Sets, Relations and Functions</p>
                        <span className="subject-tag">Mathematics</span>
                        <button className="continue-btn">Continue</button>
                    </div>
                </div>
            </div>

            {/* Flashcards Section */}
            <div className="flashcards-section">
                <h2>Flash Cards</h2>
                <div className="flashcard-stats">
                    <div className="stat-item mastered">
                        <img src="/icons/mastered.svg" alt="Mastered icon" />
                        <span>Mastered</span>
                        <h3>0</h3>
                    </div>
                    <div className="stat-item to-learn">
                        <img src="/icons/to-learn.svg" alt="To Learn icon" />
                        <span>To Learn</span>
                        <h3>70</h3>
                    </div>
                    <div className="stat-item bookmarked">
                        <img src="/icons/bookmark.svg" alt="Bookmark icon" />
                        <span>Bookmarked</span>
                        <h3>8</h3>
                    </div>
                </div>
                <button className="open-flashcards-btn">Open Flashcards</button>
            </div>

            {/* Goals Card */}
            <div className="card goals-card">
                <div className="card-header">
                    <h2>Your Goals</h2>
                    <button className="set-goal-btn" onClick={openGoalModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                        Set new goal
                    </button>
                </div>
                
                <div className="goal-list">
                    <div className="goal-row">
                        <div className="goal-left">
                            <svg className="circle-icon" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            <div className="goal-text">Complete <span className="goal-highlight">Sets, Relations & Functions</span> by <span className="goal-date">1st September</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '0%' }}></div>
                            </div>
                            <span className="progress-text">0%</span>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="goal-row">
                        <div className="goal-left">
                            <svg className="circle-icon" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            <div className="goal-text">Complete <span className="goal-highlight">Organic Chemistry</span> by <span className="goal-date">Tomorrow</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '0%' }}></div>
                            </div>
                            <span className="progress-text">0%</span>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="goal-row completed">
                        <div className="goal-left">
                            <svg className="checkmark-icon" viewBox="0 0 24 24">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                            <div className="goal-text">Completed <span className="goal-highlight">Organic Chemistry</span> by <span className="goal-date">29th August</span></div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '100%' }}></div>
                            </div>
                            <span className="progress-text">100%</span>
                        </div>
                        <div className="goal-right">
                            <button className="icon-btn edit-btn" aria-label="Edit goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className="icon-btn delete-btn" aria-label="Delete goal">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* This Week's Learning Summary */}
            <div className="card learning-summary-card">
                <h2>This Week's Learning Summary</h2>
                
                <div className="learning-content">
                    <div className="learning-left">
                        <div className="learning-item video-item">
                            <span className="learning-icon">
                                <i className="far fa-play-circle"></i>
                            </span>
                            <div className="learning-info">
                                <div className="learning-label">Video Lectures</div>
                                <div className="learning-time">
                                    5<span className="unit">hrs</span> 30<span className="unit">mins</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="learning-item reading-item">
                            <span className="learning-icon">
                                <i className="far fa-file-alt"></i>
                            </span>
                            <div className="learning-info">
                                <div className="learning-label">Reading Material</div>
                                <div className="learning-time">
                                    40<span className="unit">min</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="learning-item practice-item">
                            <span className="learning-icon">
                                <i className="far fa-question-circle"></i>
                            </span>
                            <div className="learning-info">
                                <div className="learning-label">Practice Questions</div>
                                <div className="learning-value">50</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="chart-container">
                        <ReactApexChart options={pieChartOptions} series={pieChartSeries} type="donut" height={220} />
                        
                        <div className="subject-labels">
                            <div className="subject math">
                                <div className="subject-name">Mathematics</div>
                                <div className="subject-time">
                                    4<span className="unit">hrs</span> 15<span className="unit">mins</span>
                                </div>
                            </div>
                            
                            <div className="subject physics">
                                <div className="subject-name">Physics</div>
                                <div className="subject-time">
                                    1<span className="unit">hr</span> 15<span className="unit">mins</span>
                                </div>
                            </div>
                            
                            <div className="subject chemistry">
                                <div className="subject-name">Chemistry</div>
                                <div className="subject-time">
                                    2<span className="unit">hrs</span> 15<span className="unit">mins</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Section */}
            <div className="performance-card">
                <div className="performance-header">
                    <h2>This Week's Performance</h2>
                    <button className="insights-btn">
                        <i className="fas fa-chart-line"></i> More Insights
                    </button>
                </div>
                
                <div className="performance-content">
                    <div className="performance-stats">
                        <div className="stat-item tests-taken">
                            <div className="stat-icon"><i className="fas fa-clipboard-list"></i></div>
                            <div className="stat-label">Tests Taken</div>
                            <div className="stat-value">5</div>
                        </div>
                        
                        <div className="stat-item answers-correct">
                            <div className="stat-icon"><i className="fas fa-check"></i></div>
                            <div className="stat-label">Correctly Answered</div>
                            <div className="stat-value">80/120</div>
                        </div>
                        
                        <div className="take-test-container">
                            <button className="take-test-btn">Take Test</button>
                        </div>
                    </div>
                    
                    <div className="performance-chart">
                        <div className="chart-header">
                            <div className="chart-label">Avg. Score Percentage</div>
                            <div className="chart-percentage">70%</div>
                        </div>
                        
                        <div className="subject-bars">
                            <div className="subject-bar-container">
                                <div className="subject-icon math-icon">
                                    <i className="fas fa-trophy"></i>
                                </div>
                                <div className="subject-bar math-bar" style={{ width: '86%' }}>
                                    <div className="bar-value">86%</div>
                                </div>
                                <div className="subject-name">Mathematics</div>
                            </div>
                            
                            <div className="subject-bar-container">
                                <div className="subject-icon physics-icon">
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="subject-bar physics-bar" style={{ width: '78%' }}>
                                    <div className="bar-value">78%</div>
                                </div>
                                <div className="subject-name">Physics</div>
                            </div>
                            
                            <div className="subject-bar-container">
                                <div className="subject-icon chemistry-icon">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="subject-bar chemistry-bar" style={{ width: '60%' }}>
                                    <div className="bar-value">60%</div>
                                </div>
                                <div className="subject-name">Chemistry</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-cards">
                {/* Tip of the Day */}
                <div className="tip-card">
                    <h2>Tip of the day</h2>
                    <div className="tip-content">
                        <div className="tip-image">
                            <img src="/images/motivation.jpg" alt="Motivational message" />
                        </div>
                        <div className="tip-text">
                            <p className="quote">" Reading about the topics and answering questions about them on the exact day can help you understand them better. "</p>
                            <p className="author">- Joseph, Physics Faculty at Perfect Learning</p>
                        </div>
                    </div>
                </div>

                {/* Stay Motivated */}
                <div className="motivation-card">
                    <h2>Stay motivated</h2>
                    <div className="video-container">
                        <img src="/images/video-thumbnail.jpg" alt="IIT-JEE Journey Part 01" className="video-thumbnail" />
                        <div className="video-duration">12:15</div>
                        <div className="play-button">
                            <i className="fas fa-play"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Goal Modal */}
            {showGoalModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <div className="modal-title">
                                <svg className="modal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                                <h2>Set New Goal</h2>
                            </div>
                            <button className="close-btn" onClick={closeGoalModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Pick a Subject</label>
                                <div className="select-container">
                                    <select 
                                        value={subjectValue} 
                                        onChange={(e) => setSubjectValue(e.target.value)}
                                    >
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                    </select>
                                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Select Topic</label>
                                <div className="select-container">
                                    <select 
                                        value={topicValue} 
                                        onChange={(e) => setTopicValue(e.target.value)}
                                    >
                                        <option>Sets, Relations & Functions</option>
                                        <option>Calculus</option>
                                        <option>Trigonometry</option>
                                    </select>
                                    <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Complete topic by</label>
                                <div className="select-container custom-dropdown" ref={dateDropdownRef}>
                                    <div className="selected-option" onClick={toggleDateDropdown}>
                                        {deadlineValue}
                                        <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                    
                                    {showDateDropdown && (
                                        <div className="dropdown-options">
                                            <div className={`dropdown-option ${deadlineValue === 'Today' ? 'selected' : ''}`} onClick={() => handleDateSelection('Today')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Today</span>
                                                </div>
                                                <div className="day-name">
                                                    {getTodayName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Tomorrow' ? 'selected' : ''}`} onClick={() => handleDateSelection('Tomorrow')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Tomorrow</span>
                                                </div>
                                                <div className="day-name">
                                                    {getTomorrowName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Next week' ? 'selected' : ''}`} onClick={() => handleDateSelection('Next week')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Next week</span>
                                                </div>
                                                <div className="day-name">
                                                    {getNextMondayName()}
                                                </div>
                                            </div>
                                            <div className={`dropdown-option ${deadlineValue === 'Pick date' ? 'selected' : ''}`} onClick={() => handleDateSelection('Pick date')}>
                                                <div className="option-left">
                                                    <svg className="option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    <span>Pick date</span>
                                                </div>
                                                <div className="day-name">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {showCalendar && (
                                        <div className="calendar-container" ref={calendarRef}>
                                            <div className="calendar-header">
                                                <div className="month-year">
                                                    {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
                                                </div>
                                                <div className="calendar-nav">
                                                    <button className="calendar-nav-btn" onClick={prevMonth}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="15 18 9 12 15 6"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button className="calendar-nav-btn" onClick={nextMonth}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="calendar-weekdays">
                                                <div className="weekday">Mo</div>
                                                <div className="weekday">Tu</div>
                                                <div className="weekday">We</div>
                                                <div className="weekday">Th</div>
                                                <div className="weekday">Fr</div>
                                                <div className="weekday">Sa</div>
                                                <div className="weekday">Su</div>
                                            </div>
                                            <div className="calendar-days">
                                                {generateCalendarDays().map((dayObj, index) => (
                                                    <div 
                                                        key={index} 
                                                        className={`calendar-day ${!dayObj.date ? 'empty' : ''} ${
                                                            selectedDate && dayObj.date && 
                                                            selectedDate.getDate() === dayObj.date.getDate() && 
                                                            selectedDate.getMonth() === dayObj.date.getMonth() && 
                                                            selectedDate.getFullYear() === dayObj.date.getFullYear() ? 'selected' : ''
                                                        }`}
                                                        onClick={() => dayObj.date && handleDateClick(dayObj.date)}
                                                    >
                                                        {dayObj.day}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="set-goal-submit-btn" onClick={handleSetGoal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                                Set goal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;