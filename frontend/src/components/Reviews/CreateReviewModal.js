import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './index';

import './CreateReviewModal.css';

function CreateReviewModal({ carId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='post-review-btn' onClick={() => setShowModal(true)}>Post Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm carId={carId} showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
