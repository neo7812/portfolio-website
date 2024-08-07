import React, { useState, useEffect } from 'react';
import './globals.css';

function Modal({ onClose }) {
  const [isFeedback, setIsFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSuccessModal) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        const closeTimer = setTimeout(onClose, 500);
        return () => clearTimeout(closeTimer);
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

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === '') {
      alert('Feedback cannot be empty!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mkgwrdqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: feedback }),
      });

      if (response.ok) {
        setIsFeedback(false);
        setIsSuccessModal(true);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'hidden' : ''}`}>
      <div
        className={`modal-content ${isFeedback ? 'feedback' : ''} ${isSuccessModal ? 'success' : ''}`}
      >
        {!isSuccessModal ? (
          !isFeedback ? (
            <>
              <div className="message">
                <p>
                  Thank you for the visit. Hope you find this website
                  interactive!
                </p>
              </div>
              <div className="modal-buttons">
                <button className="yes-button" onClick={handleYes}>
                  Yes
                </button>
                <button className="no-button" onClick={handleNo}>
                  No
                </button>
              </div>
            </>
          ) : (
            <div className="feedback-section">
              <p>
                I&apos;m sorry to hear that. I&apos;m working to make the
                website more interactive. Please provide your feedback:
              </p>
              <textarea
                placeholder="Tell me how I can make changes..."
                value={feedback}
                onChange={handleFeedbackChange}
                aria-label="Feedback input"
              ></textarea>
              <button onClick={handleSubmitFeedback} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          )
        ) : (
          <div className="success-message">
            <p>
              Thank you for your feedback! I hope you visit my website more
              often.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
