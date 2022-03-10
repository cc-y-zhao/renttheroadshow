import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ProfileButton from './ProfileButton';

function ProfileButtonModal({ user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='nav-element btn-in-listing prof-icon' onClick={() => setShowModal(true)}>
        <i className="fas fa-user-circle profile-btn" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfileButton user={user} showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ProfileButtonModal;
