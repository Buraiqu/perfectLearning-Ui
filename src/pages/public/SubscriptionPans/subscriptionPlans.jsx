
import React from 'react';
import './subscriptionPlans.css';
import SubscriptionPlansComponent from '../../../components/Subscription/subscription';
import { useLocation } from 'react-router-dom';

const SubscriptionPlans = () => {
    const location = useLocation();
    const courseId = location.state?.courseId;

    return (
        <SubscriptionPlansComponent courseId={courseId}/>
    );
};

export default SubscriptionPlans;