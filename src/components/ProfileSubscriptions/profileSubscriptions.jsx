import React from 'react';
import './profileSubscriptions.css';
import { useNavigate } from 'react-router-dom';

const ProfileSubscriptions = () => {
    const navigate = useNavigate();

    const subscriptionData = [
        {
            course: 'IIT JEE Advanced',
            plan: 'LDC 2022 Basic Plan',
            purchaseDate: '30/08/2023',
            amount: '$200',
            status: 'Active'
        },
        {
            course: 'IIT JEE Advanced',
            plan: 'LDC 2022 Basic Plan',
            purchaseDate: '30/08/2023',
            amount: '$200',
            status: 'Active'
        }
    ];

    return (
        <div className="subscription-content">
            <div className="subscription-table">
                <div className="table-header">
                    <div className="header-cell">Course</div>
                    <div className="header-cell">Subscription Plan</div>
                    <div className="header-cell">Purchased on</div>
                    <div className="header-cell">Amount</div>
                    <div className="header-cell">Status</div>
                    <div className="header-cell">Upgradation</div>
                </div>
                
                <div className="table-body">
                    {subscriptionData.map((subscription, index) => (
                        <div className="table-row" key={index}>
                            <div className="body-cell" data-label="Course">{subscription.course}</div>
                            <div className="body-cell" data-label="Subscription Plan">{subscription.plan}</div>
                            <div className="body-cell" data-label="Purchased on">{subscription.purchaseDate}</div>
                            <div className="body-cell" data-label="Amount">{subscription.amount}</div>
                            <div className="body-cell" data-label="Status">
                                <span className="status-badge active">{subscription.status}</span>
                            </div>
                            <div className="body-cell" data-label="Upgradation">
                                <button className="upgrade-btn" onClick={() => navigate('/main/upgrade-plan')}>Upgrade</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="explore-courses-btn" onClick={() => navigate('/')}>
                Explore other courses
            </button>
        </div>
    );
};

export default ProfileSubscriptions;
