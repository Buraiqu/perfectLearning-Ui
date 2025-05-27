import React from 'react';
import SubscriptionPlansComponent from '../../../components/Subscription/subscription';
import { useNavigate } from 'react-router-dom';

const UpgradePlans = () => {

    const navigate = useNavigate();

    return (
        <>
            <div style={{padding: '30px 20px 0px 30px', fontSize: '16px',fontWeight: '400'}}>
                <span><span style={{cursor: 'pointer', color: '#2E69A2'}} onClick={() => navigate('/main/profile')}>My Profile</span>  &gt;  Subscription Plans</span>
            </div>
            <SubscriptionPlansComponent data={{
                action: 'upgrade-plan',
                index: '0'
            }}/>
        </>
    );
};

export default UpgradePlans;