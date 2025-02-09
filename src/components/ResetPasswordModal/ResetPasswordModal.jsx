import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './ResetPasswordModal.css';

const ResetPasswordModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    // TODO: Implement password reset functionality
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="reset-password-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email ID</label>
            <input
              type="email"
              className="custom-input"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-btn">
            Send reset link
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPasswordModal;
