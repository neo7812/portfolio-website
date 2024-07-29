import React, { useState, useEffect } from 'react';
import './globals.css';

function Modal({ onClose }) {
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSuccessModal) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
        }, 500); 
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [isSuccessModal, onClose]);

  const handleYes = () => {
    setIsSuccessModal(true);
  };

  const handleNo = () => {
    setIsFeedback(true);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim() === "") {
      alert("Feedback cannot be empty!");
      return;
    }
    console.log("Feedback submitted:", feedback);
    setIsFeedback(false); 
    setIsSuccessModal(true); 
  };

  return (
    <>
      {!isSuccessModal && (
        <div className={`modal-overlay ${isClosing ? 'hidden' : ''}`}>
          <div className={`modal-content ${isFeedback ? 'feedback' : ''}`}>
            {!isFeedback ? (
              <>
                <div className="message">
                  <p>Thank you for the visit. Hope you find this website interactive!</p>
                </div>
                <div className="modal-buttons">
                  <button className="yes-button" onClick={handleYes}>Yes</button>
                  <button className="no-button" onClick={handleNo}>No</button>
                </div>
              </>
            ) : (
              <div className="feedback-section">
                <p>I'm sorry to hear that. I'm working to make the website more interactive. Please provide your feedback:</p>
                <textarea 
                  placeholder="Tell me how I can make changes..." 
                  value={feedback} 
                  onChange={handleFeedbackChange}
                ></textarea>
                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
              </div>
            )}
          </div>
        </div>
      )}
      {isSuccessModal && (
        <div className={`success-modal-overlay ${isClosing ? 'hidden' : ''}`}>
          <div className={`success-modal-content`}>
            <p>Great! I hope you visit my website more often.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
