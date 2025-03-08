import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import profileIcon from '../../icons/profile-icon.svg';
import downArrowIcon from '../../icons/down-arrow-icon.svg';
import { AuthContext } from '../../context/authContext';
import './navAvatar.css';

const NavAvatar = ({showOnlyIcon}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    
    const isMyCoursesPage = location.pathname === '/main/my-courses';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <div className="profile-section position-relative" ref={dropdownRef}>
            {showOnlyIcon ? (
                <div 
                    className="d-flex align-items-center gap-2 profile-trigger"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <>
                        <div className="profile-avatar d-flex align-items-center justify-content-center">
                            <img src={profileIcon} alt="" />
                        </div>
                        <img 
                            src={downArrowIcon} 
                            className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`}
                            alt="" 
                        />
                    </>
                </div>
            ):(
                <div 
                    className="align-items-center gap-2 profile-trigger"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <>
                        <span>
                            Profile
                        </span>
                    </>
                </div>
            )}

            {showDropdown && (
                <div className={ showOnlyIcon ? "profile-dropdown" : "text-profile-dropdown"}>
                    <div className="dropdown-header">
                        <h3>{user?.name}</h3>
                    {/* </div>
                    <div className="dropdown-menu"> */}
                        <button 
                            className={`dropdown-item first-item ${isMyCoursesPage ? 'active' : ''}`}
                            type='button' 
                            onClick={() => navigate('/main/my-courses')}
                        >
                            My courses
                        </button>
                        <button className="dropdown-item">
                            My profile
                        </button>
                        <button className="dropdown-item logout-item" onClick={() => handleLogout()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavAvatar;