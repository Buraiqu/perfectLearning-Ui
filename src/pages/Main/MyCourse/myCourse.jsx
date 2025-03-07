import React, { useEffect, useRef, useState } from "react";
import verticalThreeDotIcon from "../../../icons/verticalThreeDot-icon.svg";
import logo from "../../../assets/logo_full.svg";
import "./myCourse.css";
import NavAvatar from "../../../components/NavAvatar/navAvatar";
import Notification from "../../../components/Notification/notification";

const MyCourse = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            const isThreeDotButton = target.classList.contains('btn-more') || 
                                   target.parentElement?.classList.contains('btn-more');
            
            if (dropdownRef.current && 
                !dropdownRef.current.contains(target) && 
                !isThreeDotButton) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMoreClick = (courseId, event) => {
        event.stopPropagation();
        setActiveDropdown(activeDropdown === courseId ? null : courseId);
    };

    const courses = [
        {
            id: 1,
            title: "Joint Entrance Examination Advanced",
            plan: "LDC 2022 Basic Plan"
        },
        {
            id: 2,
            title: "UPSC Civil Services Examination",
            plan: "Premium Plan"
        },
        {
            id: 3,
            title: "UPSC Civil Services Examination Copy-1",
            plan: "Basic Plan"
        },
    ];

    return (
        <div className="my-courses-container">
            <div className="my-courses-topbar">
                <div className="topbar-left">
                    <a href="/" className="logo-link">
                        <img src={logo} alt="Perfect Learning" className="logo-image" />
                    </a>
                </div>
                <div className="topbar-right">
                    <Notification showOnlyIcon={true}/>
                    <NavAvatar showOnlyIcon={true}/>
                </div>
            </div>
            <div className="my-courses-content">
                <h1 className="page-title">My Courses</h1>
            <div className="my-courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="my-course-card">
                        <div className="my-course-info">
                            <h2 className="my-course-title">{course.title}</h2>
                            <span className="my-course-plan">{course.plan}</span>
                        </div>
                        <div className="my-course-actions">
                            <button className="btn-upgrade">Upgrade</button>
                            <button className="btn-go-to-course">
                                Go to Course
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <div className="more-options-container" ref={dropdownRef}>
                                <button 
                                    className="btn-more" 
                                    onClick={(e) => handleMoreClick(course.id, e)}
                                >
                                    <img src={verticalThreeDotIcon} alt="" />
                                </button>
                                {activeDropdown === course.id && (
                                    <div className="more-options-dropdown">
                                        <button className="more-option-item">
                                            Share
                                        </button>
                                        <button className="more-option-item">
                                            Rate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default MyCourse;