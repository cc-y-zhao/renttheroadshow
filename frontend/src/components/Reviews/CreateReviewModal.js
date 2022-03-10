import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './index';

function CreateReviewModal({ carId, userId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span className='nav-element create-form-btn' onClick={() => setShowModal(true)}>Post Review</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm carId={carId} userId={userId} showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
