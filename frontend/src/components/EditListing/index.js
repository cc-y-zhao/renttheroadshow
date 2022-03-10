import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditListingForm from './EditListing';

function EditListingModal({ car, ownerId, carId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='nav-element btn-in-listing' onClick={() => setShowModal(true)}>Edit Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditListingForm car={car} ownerId={ownerId} carId={carId} showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditListingModal;
