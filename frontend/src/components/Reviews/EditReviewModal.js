import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';

function EditReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='btn-in-review edit-review-btn' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm review={review} showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
