
import React, { useState } from 'react';
import LearningPracticeSummary from '../../../components/LearningPracticeSummary/LearningPracticeSummary';
import TestPerformance from '../../../components/TestPerformance/TestPerformance';
import './myPerformance.css';

const MyPerformance = () => {
    const [activeTab, setActiveTab] = useState('learning');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="my-performance-container">
            <div className="performance-tabs">
                <div 
                    className={`tab ${activeTab === 'learning' ? 'active' : ''}`}
                    onClick={() => handleTabChange('learning')}
                >
                    Learning & Practice Summary
                </div>
                <div 
                    className={`tab ${activeTab === 'test' ? 'active' : ''}`}
                    onClick={() => handleTabChange('test')}
                >
                    Test Performance
                </div>
            </div>

            <div className="date-range-selector">
                <input type="date" className="date-input" />
                <span className="date-separator">→</span>
                <input type="date" className="date-input" />
                <button className="calendar-button">
                    <i className="far fa-calendar"></i>
                </button>
            </div>
            
            <div className="tab-content">
                {activeTab === 'learning' ? (
                    <LearningPracticeSummary />
                ) : (
                    <TestPerformance />
                )}
            </div>
        </div>
    );
};

export default MyPerformance;