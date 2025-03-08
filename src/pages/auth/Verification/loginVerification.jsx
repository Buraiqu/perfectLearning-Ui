import React, { useState } from 'react';
import PerfectLearningLogo from '/assets/logo_full.svg';
import circleGreenTickIcon from '../../../icons/circle-green-tick-icon.svg';
import { useNavigate } from 'react-router-dom';
import './loginVerification.css';

const LoginVerification = () => {

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [resendCode, setResendCode] = useState(false);
  const [sendCodeOnMobile, setSendCodeOnMobile] = useState(false);
  const inputRefs = Array(6).fill(0).map(() => React.createRef());

  const navigate = useNavigate();

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {

    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join('');

    console.log('Verification code:', code);
  };

  return (
    <div className="verification-container">
      <div className="verification-content">
        <img src={PerfectLearningLogo} alt="Perfect Learning" className="logo" />
        <h2>Email Verification Code</h2>
        <p className="verification-text">
          {!resendCode && !sendCodeOnMobile ? (
            <>
                Please enter the code you received on <span>aravanthi.140594@gmail.com</span>.
            </>
          ): (
            <>
                Please enter the code you received on email ID entered.
            </>
          )}
        </p>
        {resendCode && (
            <>
                {sendCodeOnMobile ? (
                    <div className="resent-mobile-message">
                        <img src={circleGreenTickIcon} alt="circle-green-tick-icon"/>
                        We have resent the code on phone number ********1827
                    </div>
                ): (
                    <div className="resent-message">
                        <img src={circleGreenTickIcon} alt="circle-green-tick-icon"/>
                        We have resent the code on your email
                    </div>
                )}
            </>
        )}
        
        <h2 className="verification-code-title">Verification Code</h2>

        <div className="verification-code-inputs">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={inputRefs[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="code-input"
            />
          ))}
        </div>

        <button className="verify-button" onClick={handleVerify}>
          Verify
        </button>

        <div className="verification-links">
          <div className="didnt-receive">
            Didn't receive email? <a  className="resend-link" onClick={() => setResendCode(true)}>Resend</a>
          </div>
          <a className="change-email-link" onClick={() => navigate('/login')}>Change Email Address</a>
        </div>

        <div className="phone-verification-link">
            {!sendCodeOnMobile ? (  
                <a className='a' onClick={() => {
                    setResendCode(true)
                    setSendCodeOnMobile(true)
                }}>Send verification code on registered phone number</a>
            ): (
                <a className='a' onClick={() => {
                    setResendCode(false)
                    setSendCodeOnMobile(false)
                }}>Send verification code on Email</a>
            )}
        </div>
      </div>
    </div>
  );
};

export default LoginVerification;
