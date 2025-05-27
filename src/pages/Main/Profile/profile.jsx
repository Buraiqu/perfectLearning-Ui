import Profile from '../../../components/Profile/profile';
import ProfileSubscriptions from '../../../components/ProfileSubscriptions/profileSubscriptions';
import "./profile.css"
import { useState } from 'react';

const ProfilePage = () => {

    const [selectedTab, setSelectedTab] = useState('personal');

  return (
    <div className="profile-page">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-container">
            
            <div className="profile-tabs">
                <button 
                    className={`tab ${selectedTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('personal')}
                >
                    Personal Details
                </button>
                <button 
                    className={`tab ${selectedTab === 'subscriptions' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('subscriptions')}
                >
                    Subscriptions
                </button>
            </div>
            {selectedTab === 'personal' ? (
                <Profile />
            ):(<ProfileSubscriptions />)}
        </div>
    </div>
  );
};

export default ProfilePage;