import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_full from '/assets/logo_full.svg';
import logo_short from '/assets/logo_short.svg';
import homeIcon from '../../icons/home-icon.svg';
import studyPlannerIcon from '../../icons/studyPlanner-icon.svg';
import courseMaterialIcon from '../../icons/courseMaterial-icon.svg';
import practiceTestIcon from '../../icons/practiceTests-icon.svg';
import myPerformanceIcon from '../../icons/myPerformance-icon.svg';
import myNotesIcon from '../../icons/myNotes-icon.svg';
import homeActiveIcon from '../../icons/home-active-icon.svg';
import studyPlannerActiveIcon from '../../icons/studyPlanner-active-icon.svg';
import courseMaterialActiveIcon from '../../icons/courseMaterial-active-icon.svg';
import practiceTestActiveIcon from '../../icons/practiceTests-active-icon.svg';
import myPerformanceActiveIcon from '../../icons/myPerformance-active-icon.svg';
import myNotesActiveIcon from '../../icons/myNotes-active-icon.svg';
import './sidebar.css';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            title: 'Home',
            path: '/main/dashboard',
            icon: homeIcon,
            activeIcon: homeActiveIcon
        },
        {
            title: 'Study Planner',
            path: '/study-planner',
            icon: studyPlannerIcon,
            activeIcon: studyPlannerActiveIcon
        },
        {
            title: 'Course Material',
            path: '/course-material',
            icon: courseMaterialIcon,
            activeIcon: courseMaterialActiveIcon
        },
        {
            title: 'Practice Tests',
            path: '/practice-tests',
            icon: practiceTestIcon,
            activeIcon: practiceTestActiveIcon
        },
        {
            title: 'My Performance',
            path: '/my-performance',
            icon: myPerformanceIcon,
            activeIcon: myPerformanceActiveIcon
        },
        {
            title: 'My Notes',
            path: '/my-notes',
            icon: myNotesIcon,
            activeIcon: myNotesActiveIcon
        }
    ];

    return (
        <>
            {isExpanded && <div className="sidebar-overlay" onClick={() => setIsExpanded(false)} />}
            <div 
                className={`sidebar ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
            <div className="sidebar-header">
                {isExpanded ? (
                    <img src={logo_full} alt="Perfect Learning" className="logo" />
                ) : (
                    <img src={logo_short} alt="Perfect Learning" className="logo" />
                )}
                <div className="course-info">
                    <div className="side-bar-course-badge">
                        <span>IJ</span>
                    </div>
                    {isExpanded && <div className="course-name">IIT JEE Advanced</div>}
                </div>
                <div style={{border: '1px solid #E0E1E9', marginTop: '20px'}}></div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`side-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <img className="menu-icon" src={location.pathname === item.path ? item.activeIcon : item.icon}></img>
                        {isExpanded && <span className="menu-title">{item.title}</span>}
                    </Link>
                ))}
            </nav>
            </div>
        </>
    );
};

export default Sidebar;
