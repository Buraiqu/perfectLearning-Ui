import { useState } from 'react';
import profileIcon from '../../icons/profile-icon.svg';
import pencilIcon from '../../icons/pencil-icon-blue.svg';
import './profile.css';

const Profile = () => {
    const [country, setCountry] = useState('India');
    const [gender, setGender] = useState('Female');
    const [education, setEducation] = useState('11th Standard');

    return (
        <div className="profile-content">
            <div className="profile-sidebar">
                <div className="profile-avat">
                    <img src={profileIcon} alt="Profile" />
                    <button className="edit-avatar">
                        <img src={pencilIcon} alt="Edit" />
                    </button>
                </div>
                <h2 className="profile-name">Sravanthi Edara</h2>
                <div className="profile-plan">
                    IIT JEE Advanced - LDC 2022 Basic Plan
                </div>
                <div className="profile-stream">
                    <label>Stream</label>
                    <select defaultValue="Engineering">
                        <option value="Engineering">Engineering</option>
                    </select>
                </div>
            </div>

            <div className="profile-main">
                <div className="form-row">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" defaultValue="Sravanthi Edara" />
                    </div>
                    <div className="form-group">
                        <label>Address Line 1</label>
                        <input type="text" defaultValue="Lakshmi Nivas" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Country</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Address Line 2</label>
                        <input type="text" defaultValue="Kureepuzha" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <div className="phone-input">
                            <span className="my-profile-country-code">+91</span>
                            <input type="tel" defaultValue="9709303485" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Post Office</label>
                        <input type="text" defaultValue="Kollam" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" defaultValue="Kollam" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" defaultValue="1994-05-14" />
                    </div>
                    <div className="form-group">
                        <label>Pin code</label>
                        <input type="text" defaultValue="691601" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email ID</label>
                        <input 
                            type="email" 
                            defaultValue="sravanthi.140594@gmail.com" 
                            className="disabled"
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" defaultValue="Kerala" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Education Qualification</label>
                        <select value={education} onChange={(e) => setEducation(e.target.value)}>
                            <option value="11th Standard">11th Standard</option>
                        </select>
                    </div>
                </div>

                <button className="save-button">Save</button>
            </div>
        </div>
    );
};

export default Profile;
