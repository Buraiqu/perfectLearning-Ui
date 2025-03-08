import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PerfectLearningLogo from '/assets/logo_full.svg';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './onBoarding.css';

const OnBoarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [valid, setValid] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1 data
    name: '',
    country: 'India',
    mobile: '',
    // Step 2 data
    education: '',
    course: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeMobile = (value, country) => {
    console.log(value, country)
    setFormData(prevState => ({
      ...prevState,
      mobile: value
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.name || !formData.country || !formData.mobile) {
        setValid(false)
        return;
      }
      setCurrentStep(2);
    } else {
      // Handle final submission
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/dashboard'); // Navigate to dashboard after submission
  };

  return (
    <div className="onboarding-form-container">
      <div className="form-header">
        <img src={PerfectLearningLogo} alt="Perfect Learning" className="onboarding-logo" />
        <div className="progress-container">
          <div className={`progress-line ${currentStep === 1 ? 'active' : currentStep === 2 ? 'completed' : ''}`}></div>
          <div className={`progress-line ${currentStep === 2 ? 'active' : ''}`}></div>
        </div>
      </div>

      <div className="form-content">
        {currentStep === 1 ? (
          <>
            <h1 className="title">We would like to know you better</h1>
            {!valid && (
                <div className="error-message">
                Please fill in the details to proceed further
                </div>
            )}
            <Form onSubmit={nextStep}>
              <Form.Group className="mb-4">
                <Form.Label>What can we call you?</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="custom-input"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Your Country</Form.Label>
                <Form.Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="custom-select"
                  required
                >
                  <option value="India">India</option>
                  {/* Add more countries as needed */}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Your mobile number</Form.Label>
                <div className="phone-input">
                  {/* <div className="country-code">+91</div> */}
                  {/* <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="999999999"
                    className="custom-input"
                    required
                  /> */}

                <PhoneInput
                    country={'in'}
                    onlyCountries={["us", "gb", "in"]}
                    value={formData.mobile}
                    onChange={handleChangeMobile}
                />
                </div>
              </Form.Group>

              <Button type="submit" className="next-btn">
                Next
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h1 className="title">Do you have a study plan?</h1>

            <Form onSubmit={nextStep}>
              <div className="study-plan-options">
                <button 
                  type="button" 
                  className={`study-plan-option ${formData.studyPlan === 'own' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'studyPlan', value: 'own' }})}
                >
                  Yes, I have my own plan
                </button>
                
                <button 
                  type="button" 
                  className={`study-plan-option ${formData.studyPlan === 'need' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'studyPlan', value: 'need' }})}
                >
                  I need a study plan from Perfect Learning
                </button>
              </div>

              <Button 
                type="submit" 
                className="next-btn get-started-btn"
                disabled={!formData.studyPlan}
              >
                Get Started
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
