import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index.js';
import './SignupForm.css';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='navlink nav-element signup-nav signup-btn-nav' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;


// className = 'navlink nav-element login-nav login-btn-nav'
