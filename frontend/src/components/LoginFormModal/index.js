import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='navlink nav-element login-nav login-btn-nav' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
