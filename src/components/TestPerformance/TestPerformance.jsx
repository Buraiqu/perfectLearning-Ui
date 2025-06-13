import React from 'react';
import './TestPerformance.css';
import clipboard_icon from '../../icons/BsClipboardData.svg';
import lightning_icon from '../../icons/BsLightningCharge.svg';
import clock_icon from '../../icons/BsClock.svg';
import tick_icon from '../../icons/left-icon.svg';
import LearningTimePieChart from '../Charts/pieChart';
import WeeklyLearningChart from '../Charts/WeeklyLearningChart';
import SubjectPracticeChart from '../Charts/SubjectPracticeChart';
import AccuracyGaugeChart from '../Charts/AccuracyGaugeChart';
import WeeklyAccuracyChart from '../Charts/WeeklyAccuracyChart';
import SubjectGoalChart from '../Charts/SubjectGoalChart';
import TopicWiseAccuracyChart from '../Charts/TopicWiseAccuracyChart';
import QuestionsAnsweredChart from '../Charts/QuestionsAnsweredChart';

const TestPerformance = () => {
    // Define questions answered chart data
    const questionsAnsweredData = [
        {
            period: "23 Sep - 30 Sep",
            questionsAnswered: 95,
            testsTaken: 1
        },
        {
            period: "1 Oct - 7 Oct",
            questionsAnswered: 135,
            testsTaken: 2
        },
        {
            period: "8 Oct - 15 Oct",
            questionsAnswered: 80,
            testsTaken: 1
        },
        {
            period: "8 Oct - 15 Oct (2)",
            questionsAnswered: 145,
            testsTaken: 2
        },
        {
            period: "16 Oct - 23 Oct",
            questionsAnswered: 65,
            testsTaken: 0
        }
    ];
    
     // Define pie chart data
     const chartData = [
        {
            category: 'Mock Exam',
            value: 3,  // 4.5 hours
            color: '#a8c7e7',
            label: '4',
            labelX: 0.1, // Center (50%)
            labelY: 0.4, // 60% from top
        },

        {
            category: 'Custom Tests',
            value: 1,  // 40 minutes = 0.67 hours
            color: '#ffd7c3',
            label: '1',
            labelX: 0.6, // 70% from left
            labelY: 0.5, // 30% from top
        },
    ];
    
    // Define weekly learning chart data
    const weeklyData = [
        {
            period: "23 Sep - 30 Sep",
            math: 4.2,
            physics: 1.5,
            chemistry: 2.3
        },
        {
            period: "1 Oct - 7 Oct",
            math: 3.5,
            physics: 1.2,
            chemistry: 2.5
        },
        {
            period: "8 Oct - 15 Oct",
            math: 1.0,
            physics: 1.6,
            chemistry: 3.5
        },
        {
            period: "16 Oct - 23 Oct",
            math: 1.8,
            physics: 2.2,
            chemistry: 2.8
        }
    ];
    
    // Define series configuration
    const seriesConfig = [
        {
            field: "math",
            name: "Mathematics",
            color: "#7DD1F3",
            cornerRadius: 5
        },
        {
            field: "physics",
            name: "Physics",
            color: "#003B6F",
            cornerRadius: 10
        },
        {
            field: "chemistry",
            name: "Chemistry",
            color: "#F1A78A",
            cornerRadius: 5
        }
    ];

    const practiceData = [
        {
            period: "23 Sep - 30 Sep",
            physics: 150,
        },
        {
            period: "1 Oct - 7 Oct",
            physics: 100,
        },
        {
            period: "8 Oct - 15 Oct",
            physics: 140,
        },
        {
            period: "16 Oct - 23 Oct",
            physics: 3.2,
        }
    ];
    
    // Define series configuration
    const practiceSeriesConfig = [
        {
            field: "physics",
            name: "Physics",
            color: "#003B6F",
            cornerRadius: 10
        }
    ];
    
    // Define y-axis configuration for learning chart (hours)
    const learningYAxisConfig = {
        min: 0,
        max: 5,
        suffix: " Hr",
        strictMinMax: true
    };
    
    // Define y-axis configuration for practice chart (percentage)
    const practiceYAxisConfig = {
        min: 0,
        max: 200,
        suffix: "",
        strictMinMax: true,
        formatter: (value) => {
            return parseInt(value) + 25;
        }
    };

    // Define subject-wise practice questions data based on the image
    const subjectPracticeData = [
        {
            period: "23 Sep - 30 Sep",
            mathematics: 45,
            physics: 24,
            chemistry: 30
        },
        {
            period: "1 Oct - 7 Oct",
            mathematics: 30,
            physics: 45,
            chemistry: 24
        },
        {
            period: "8 Oct - 15 Oct",
            mathematics: 24,
            physics: 30,
            chemistry: 45
        },
        {
            period: "16 Oct - 23 Oct",
            mathematics: 24,
            physics: 45,
            chemistry: 30
        }
    ];
    
    return (
        <div className="learning-practice-summary">
            <div className="row" style={{ gap: '20px' }}>
                <div className="summary-card" style={{ width: 'calc(40% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <img className="time-icon" src={clipboard_icon} alt="clipboard" />
                            <div className="time-title">
                                <h2>Test Taken</h2>
                            </div>
                            <div className="total-time">5</div>
                        </div>
                        
                        <div className="chart-container">
                            <LearningTimePieChart data={chartData} />
                        </div>
                        
                        <div className="legend-container">
                            <div className="legend-item">
                                <span className="legend-dot blue-dot"></span>
                                <span className="legend-text">Mock Tests</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot peach-dot"></span>
                                <span className="legend-text">Custom Tests</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-card" style={{ width: 'calc(60% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <img className="time-icon" src={lightning_icon} alt="lightning_icon" />
                            <div className="time-title">
                                <h2>Questions Answered</h2>
                            </div>
                            <div className="total-time">120</div>
                        </div>
                        
                        <div className="chart-container">
                            <QuestionsAnsweredChart data={questionsAnsweredData} />
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <img className="time-icon" src={tick_icon} alt="tick_icon" />
                            <div className="time-title">
                                <h2>Average Score Percentage</h2>
                            </div>
                            <div className="total-time">64%</div>
                        </div>
                        <div className="chart-container" style={{ height: '250px' }}>
                            <AccuracyGaugeChart accuracy={64} />
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <div className='time-title'>
                                <h2>Week wise Avg. Score Percentage</h2>
                            </div>
                        </div>
                        <div className="chart-container" style={{ height: '250px' }}>
                            <WeeklyAccuracyChart />
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <div className='time-title'>
                                <h2>Subject wise Score Percentages</h2>
                            </div>
                        </div>
                        <div className="chart-container" style={{ height: '350px' }}>
                            <SubjectGoalChart />
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <div className='time-title'>
                                <h2>Subject wise Weekly Scores</h2>
                            </div>
                        </div>
                        <div className="subject-legend">
                            <div className="legend-item">
                                <span className="legend-dot math-dot"></span>
                                <span className="legend-text">Mathematics</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot physics-dot"></span>
                                <span className="legend-text">Physics</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot chemistry-dot"></span>
                                <span className="legend-text">Chemistry</span>
                            </div>
                        </div>
                        
                        <div className="chart-container">
                            <WeeklyLearningChart 
                                data={weeklyData} 
                                seriesConfig={seriesConfig} 
                                yAxisConfig={learningYAxisConfig} 
                            />
                        </div>
                        
                        <div className="time-periods">
                            <div className="time-period">23 Sep - 30 Sep</div>
                            <div className="time-period">1 Oct - 7 Oct</div>
                            <div className="time-period">8 Oct - 15 Oct</div>
                            <div className="time-period">16 Oct - 23 Oct</div>
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <img className="time-icon" src={clock_icon} alt="clock_icon" />
                            <div className='time-title'>
                                <h2>Avg Time Taken Per Question</h2>
                            </div>
                            <div className="total-time">2 Min 22 sec</div>
                        </div>
                        
                        <div className="chart-container">
                            <WeeklyLearningChart 
                                data={practiceData} 
                                seriesConfig={practiceSeriesConfig} 
                                yAxisConfig={practiceYAxisConfig}
                            />
                        </div>
                        
                        <div className="time-periods">
                            <div className="time-period">23 Sep - 30 Sep</div>
                            <div className="time-period">1 Oct - 7 Oct</div>
                            <div className="time-period">8 Oct - 15 Oct</div>
                            <div className="time-period">16 Oct - 23 Oct</div>
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(50% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <div className='time-title'>
                                <h2>Subject wise Time Taken Per Questions</h2>
                            </div>
                        </div>
                        
                        <div className="chart-container">
                            <SubjectPracticeChart data={subjectPracticeData} />
                        </div>
                        
                        <div className="subject-legend" style={{ padding: '20px' }}>
                            <div className="legend-item">
                                <span className="legend-dot math-dot"></span>
                                <span className="legend-text">Mathematics</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot physics-dot"></span>
                                <span className="legend-text">Physics</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot chemistry-dot"></span>
                                <span className="legend-text">Chemistry</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="summary-card" style={{ width: 'calc(100% - 10px)' }}>
                    <div className="learning-time-card">
                        <div className="time-header">
                            <div className='time-title'>
                                <h2>Topic Wise Accuracy Percentage</h2>
                            </div>
                        </div>
                        <div className="chart-container" style={{ height: '450px' }}>
                            <TopicWiseAccuracyChart />
                        </div>
                    </div>

                    <div className="legend-container" style={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FF9999', marginRight: '8px' }}></div>
                                <span>Mathematics</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFCC99', marginRight: '8px' }}></div>
                                <span>Physics</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#99CCFF', marginRight: '8px' }}></div>
                                <span>Chemistry</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TestPerformance;
