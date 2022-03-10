import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateListingForm from './CreateListingForm';

function CreateRentalListingModal({user}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span className='nav-element create-form-btn' onClick={() => setShowModal(true)}>Create Rental Listing</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateListingForm user={user} showModal={showModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateRentalListingModal;
