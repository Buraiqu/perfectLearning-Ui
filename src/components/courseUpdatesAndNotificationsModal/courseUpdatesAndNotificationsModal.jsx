import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import './courseUpdatesAndNotificationsModal.css'

const CourseUpdatesAndNotificationModal = ({showModal, setShowModal}) => {

    const [notificationMethod, setNotificationMethod] = useState('email')
    const [contactInfo, setContactInfo] = useState('')

    const handleSubscribe = () => {
        console.log('Subscribing with:', { method: notificationMethod, contact: contactInfo })
        setContactInfo('')
    };

    const handleClose = () => {
        setShowModal(false)
        setContactInfo('')
    };

    return(
        <Modal onHide={handleClose} show={showModal} centered className="course-updates-modal">
            <Modal.Header closeButton>
                <Modal.Title>Course Updates & Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>We will send exam updates and notifications on your preferred method.</p>
                
                <Form.Group className="mb-3">
                    <Form.Label>Notification Method</Form.Label>
                    <div className="notification-radio-group">
                        <Form.Check
                            type="radio"
                            id="email-radio"
                            name="notification-method"
                            label="Email"
                            value="email"
                            checked={notificationMethod === 'email'}
                            onChange={(e) => setNotificationMethod(e.target.value)}
                            className="notification-radio"
                        />
                        <Form.Check
                            type="radio"
                            id="whatsapp-radio"
                            name="notification-method"
                            label="WhatsApp"
                            value="whatsapp"
                            checked={notificationMethod === 'whatsapp'}
                            onChange={(e) => setNotificationMethod(e.target.value)}
                            className="notification-radio"
                        />
                        <Form.Check
                            type="radio"
                            id="sms-radio"
                            name="notification-method"
                            label="SMS"
                            value="sms"
                            checked={notificationMethod === 'sms'}
                            onChange={(e) => setNotificationMethod(e.target.value)}
                            className="notification-radio"
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        {notificationMethod === 'email' ? 'Email Address' : 
                            notificationMethod === 'whatsapp' ? 'WhatsApp Number' : 
                            'Phone Number'}
                    </Form.Label>
                    <Form.Control
                        type={notificationMethod === 'email' ? 'email' : 'tel'}
                        placeholder={notificationMethod === 'email' ? 
                            'Enter your email' : 
                            'Enter your phone number'}
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <button 
                    className="notification-btn" 
                    onClick={handleSubscribe}
                    style={{ width: '100%' }}
                >
                    Subscribe
                </button>
            </Modal.Footer>
        </Modal>
    )

}
export default CourseUpdatesAndNotificationModal;