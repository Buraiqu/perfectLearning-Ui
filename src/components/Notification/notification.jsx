import { useState, useRef, useEffect } from 'react';
import bellIcon from '../../icons/bell-icon.svg';
import './notification.css';

const Notification = ({ showOnlyIcon }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const notifications = [
        {
            message: 'You have a goal to complete sets by tomorrow. Continue to make progress',
            date: '31 August'
        },
        {
            message: 'You made amazing progress last week. Keep it up',
            date: '28 August'
        },
        {
            message: 'You made amazing progress last week. Keep it up',
            date: '28 August'
        },
        {
            message: 'You made amazing progress last week. Keep it up',
            date: '28 August'
        },
        {
            message: 'You made amazing progress last week. Keep it up',
            date: '29 August'
        },
        {
            message: 'You made amazing progress last week. Keep it up',
            date: '30 August'
        },
    ];

    return (
        <div className="notification-container position-relative" ref={dropdownRef}>
            <div 
                className="notification-icon position-relative"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {showOnlyIcon ? (
                    <>
                        <img src={bellIcon} alt="" style={{cursor: 'pointer'}} />
                        <span className="notification-badge"></span>
                    </>
                ): (
                    <>
                        <span>
                            Notifications
                        </span>
                    </>
                )}
            </div>

            {showDropdown && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h2 className="notification-title">Notifications</h2>
                        <button className="notification-close" onClick={() => setShowDropdown(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="notification-list">
                        {notifications.map((notification, index) => (
                            <div key={index} className="notification-item">
                                <p className="notification-message">{notification.message}</p>
                                <span className="notification-date">{notification.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;